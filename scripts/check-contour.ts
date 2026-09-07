/**
 * Exercises the hero's contour field headlessly and asserts what it draws.
 * Parsing proves nothing: this renders real frames and inspects the geometry.
 */
import { ContourField } from '../src/lib/components/contour.ts';

type Stat = {
	moves: number;
	lines: number;
	strokes: number;
	xs: number[];
	ys: number[];
	bad: boolean;
};

function recorder(stat: Stat) {
	const rec = (x: number, y: number) => {
		if (Number.isFinite(x) && Number.isFinite(y)) {
			stat.xs.push(x);
			stat.ys.push(y);
		} else stat.bad = true;
	};
	return new Proxy(
		{
			moveTo: (x: number, y: number) => (stat.moves++, rec(x, y)),
			lineTo: (x: number, y: number) => (stat.lines++, rec(x, y)),
			stroke: () => stat.strokes++
		} as Record<string, unknown>,
		{ get: (t, k) => (k in t ? t[k as string] : () => {}), set: () => true }
	) as unknown as CanvasRenderingContext2D;
}

const VIEWPORTS: [string, number, number][] = [
	['phone   390x800', 390, 800],
	['laptop 1440x900', 1440, 900],
	['wide   2560x1400', 2560, 1400]
];

let failed = false;

for (const [label, w, h] of VIEWPORTS) {
	const stat: Stat = { moves: 0, lines: 0, strokes: 0, xs: [], ys: [], bad: false };
	const ctx = recorder(stat);
	const field = new ContourField({ intensity: 0.6, lag: 0.6 });
	field.resize(w, h);

	const FRAMES = 8;
	for (let i = 0; i < FRAMES; i++) {
		field.step();
		if (i === 3) field.setPointer(0.68, 0.3);
		field.render(ctx);
	}

	const xmin = Math.min(...stat.xs);
	const xmax = Math.max(...stat.xs);
	const ymin = Math.min(...stat.ys);
	const ymax = Math.max(...stat.ys);

	const covers = xmin < 0 && xmax > w && ymin < 0 && ymax > h;
	const drew = stat.lines > 200 * FRAMES;
	const levels = stat.strokes === 16 * FRAMES;
	const ok = covers && drew && levels && !stat.bad;
	if (!ok) failed = true;

	console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
	console.log(
		`        ${Math.round(stat.lines / FRAMES)} segments/frame, ${stat.strokes / FRAMES} levels/frame`
	);
	console.log(`        extent x ${xmin.toFixed(0)}..${xmax.toFixed(0)} (frame 0..${w})`);
	console.log(`        extent y ${ymin.toFixed(0)}..${ymax.toFixed(0)} (frame 0..${h})`);
	if (stat.bad) console.log('        !! non-finite coordinates emitted');
	if (!covers) console.log('        !! field does not overrun every edge');
	if (!drew) console.log('        !! too few segments — field may be empty');
}

if (failed) process.exit(1);
console.log('\nall viewports: contours drawn, finite, and overrunning every edge');
