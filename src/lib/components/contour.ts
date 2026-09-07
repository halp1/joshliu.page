/**
 * Contour field for the hero background — plan view, with a small per-level
 * parallax lift and an index contour every fourth line.
 *
 * The world domain is always larger than the frame, so every contour leaves the
 * picture on all four sides: there is no horizon and no terminating edge.
 * Kept free of DOM wiring so it can be exercised headlessly in a test.
 */

const INK = '237,234,228';

/** World units between grid samples. Shortest feature wavelength is ~2.03. */
const CELL = 0.16;
const LEVEL_MIN = -1.15;
const LEVEL_MAX = 1.75;
const LEVELS = 16;
const LEVEL_STEP = (LEVEL_MAX - LEVEL_MIN) / (LEVELS - 1);

/** Fraction of the frame the domain overhangs, horizontally and vertically. */
const OVER_X = 0.15;
const OVER_Y = 0.15;

export interface ContourOptions {
	/** Peak line opacity multiplier, 0–1. */
	intensity?: number;
	/** How far the field trails the pointer, 0–1. */
	lag?: number;
	/** Screen pixels each contour level lifts by. */
	elevation?: number;
}

export class ContourField {
	private w = 0;
	private h = 0;
	private cols = 0;
	private rows = 0;
	private uSpan = 0;
	private vSpan = 0;
	private field = new Float32Array(0);

	private tx = 0.6;
	private ty = 0.45;
	private ax = 0.6;
	private ay = 0.45;
	private bx = 0.6;
	private by = 0.45;

	private t = 0;
	private pointed = false;

	intensity: number;
	lag: number;
	elevation: number;

	constructor(opts: ContourOptions = {}) {
		this.intensity = opts.intensity ?? 0.6;
		this.lag = opts.lag ?? 0.6;
		this.elevation = opts.elevation ?? 21;
	}

	/**
	 * Sizes the sampling grid from the frame. Columns follow the width, then the
	 * vertical span is derived so world units stay isotropic — otherwise features
	 * stretch on a tall phone. Both are clamped so the cost stays bounded.
	 */
	resize(w: number, h: number): void {
		this.w = Math.max(1, w);
		this.h = Math.max(1, h);

		this.cols = Math.min(84, Math.max(34, Math.round(this.w / 17)));
		this.uSpan = this.cols * CELL;
		const unitsPerPx = this.uSpan / ((1 + 2 * OVER_X) * this.w);
		this.vSpan = (1 + 2 * OVER_Y) * this.h * unitsPerPx;
		this.rows = Math.min(96, Math.max(26, Math.round(this.vSpan / CELL)));

		this.field = new Float32Array((this.rows + 1) * (this.cols + 1));
	}

	/** Pointer position in normalised frame coordinates. */
	setPointer(nx: number, ny: number): void {
		this.tx = nx;
		this.ty = ny;
		this.pointed = true;
	}

	private sx(gi: number): number {
		return this.w * (-OVER_X + (1 + 2 * OVER_X) * (gi / this.cols));
	}

	private sy(gj: number, level: number): number {
		return this.h * (1 + OVER_Y - (1 + 2 * OVER_Y) * (gj / this.rows)) - level * this.elevation;
	}

	/** Advances time and the two-stage pointer smoothing that produces the trail. */
	step(): void {
		this.t += 0.005;
		const k = 0.1 - 0.085 * Math.min(1, Math.max(0, this.lag));

		if (!this.pointed) {
			this.tx = 0.5 + Math.cos(this.t * 0.19) * 0.24;
			this.ty = 0.48 + Math.sin(this.t * 0.15) * 0.18;
		}
		this.ax += (this.tx - this.ax) * k;
		this.ay += (this.ty - this.ay) * k;
		this.bx += (this.ax - this.bx) * k;
		this.by += (this.ay - this.by) * k;
	}

	private compute(): void {
		const { cols, rows, uSpan, vSpan, t } = this;
		const u0 = -uSpan / 2;
		const v0 = -vSpan / 2;

		// invert the projection so the bump lands under the pointer
		const gu = (this.bx + OVER_X) / (1 + 2 * OVER_X);
		const gv = (1 + OVER_Y - this.by) / (1 + 2 * OVER_Y);
		const bu = u0 + uSpan * gu;
		const bv = v0 + vSpan * gv;
		// bump sigma held at ~9% of the domain so it covers the same share of
		// the frame whatever the viewport is
		const sigma = 0.0917 * uSpan;
		const spread = 1 / (2 * sigma * sigma);

		for (let j = 0; j <= rows; j++) {
			const v = v0 + vSpan * (j / rows);
			const dv = v - bv;
			const dv2 = dv * dv;
			for (let i = 0; i <= cols; i++) {
				const u = u0 + uSpan * (i / cols);
				let z =
					Math.sin(u * 1.6 + t * 0.3) * 0.42 +
					Math.cos(v * 1.9 - t * 0.24) * 0.36 +
					Math.sin(u * 0.8 + v * 1.3 + t * 0.18) * 0.3 +
					Math.sin(u * 3.1 - v * 2.2 + t * 0.12) * 0.14;
				const du = u - bu;
				z += 0.95 * Math.exp(-(du * du + dv2) * spread);
				this.field[j * (cols + 1) + i] = z;
			}
		}
	}

	/** Marching squares for one level; emits endpoints in fractional grid space. */
	private march(level: number, emit: (i1: number, j1: number, i2: number, j2: number) => void) {
		const { cols, rows, field } = this;
		for (let j = 0; j < rows; j++) {
			for (let i = 0; i < cols; i++) {
				const n = j * (cols + 1) + i;
				const v0 = field[n];
				const v1 = field[n + 1];
				const v2 = field[n + cols + 2];
				const v3 = field[n + cols + 1];
				let idx = 0;
				if (v0 > level) idx |= 1;
				if (v1 > level) idx |= 2;
				if (v2 > level) idx |= 4;
				if (v3 > level) idx |= 8;
				if (idx === 0 || idx === 15) continue;

				const ai = i + (level - v0) / (v1 - v0);
				const bj = j + (level - v1) / (v2 - v1);
				const ci = i + (level - v3) / (v2 - v3);
				const dj = j + (level - v0) / (v3 - v0);

				switch (idx) {
					case 1:
					case 14:
						emit(ai, j, i, dj);
						break;
					case 2:
					case 13:
						emit(ai, j, i + 1, bj);
						break;
					case 3:
					case 12:
						emit(i, dj, i + 1, bj);
						break;
					case 4:
					case 11:
						emit(i + 1, bj, ci, j + 1);
						break;
					case 6:
					case 9:
						emit(ai, j, ci, j + 1);
						break;
					case 7:
					case 8:
						emit(i, dj, ci, j + 1);
						break;
					case 5:
						emit(ai, j, i + 1, bj);
						emit(i, dj, ci, j + 1);
						break;
					case 10:
						emit(ai, j, i, dj);
						emit(i + 1, bj, ci, j + 1);
						break;
				}
			}
		}
	}

	render(ctx: CanvasRenderingContext2D): void {
		this.compute();
		ctx.clearRect(0, 0, this.w, this.h);
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';

		for (let k = 0; k < LEVELS; k++) {
			const level = LEVEL_MIN + k * LEVEL_STEP;
			// every fourth line is an index contour, the cartographic convention
			const index = k % 4 === 0;
			ctx.beginPath();
			this.march(level, (i1, j1, i2, j2) => {
				ctx.moveTo(this.sx(i1), this.sy(j1, level));
				ctx.lineTo(this.sx(i2), this.sy(j2, level));
			});
			ctx.lineWidth = index ? 1.25 : 1;
			const a = (index ? 0.13 : 0.062) * this.intensity;
			ctx.strokeStyle = `rgba(${INK},${a.toFixed(4)})`;
			ctx.stroke();
		}
	}
}
