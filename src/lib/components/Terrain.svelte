<script lang="ts">
	import { ContourField } from './contour';

	interface Props {
		/** Peak line opacity multiplier, 0–1. */
		intensity?: number;
		/** How far the field trails the pointer, 0–1. */
		lag?: number;
	}

	let { intensity = 0.6, lag = 0.6 }: Props = $props();

	let host: HTMLDivElement;
	let canvas: HTMLCanvasElement;

	$effect(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const field = new ContourField({ intensity, lag });
		const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
		const fineMQ = window.matchMedia('(pointer: fine)');

		function layout() {
			const r = host.getBoundingClientRect();
			const w = Math.max(320, Math.round(r.width));
			const h = Math.max(220, Math.round(r.height));
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
			field.resize(w, h);
		}

		function onMove(e: PointerEvent) {
			if (!fineMQ.matches) return;
			const r = host.getBoundingClientRect();
			field.setPointer((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
		}

		let raf = 0;
		let running = false;

		function tick() {
			field.step();
			field.render(ctx!);
			raf = requestAnimationFrame(tick);
		}
		function start() {
			if (running || reduceMQ.matches) return;
			running = true;
			raf = requestAnimationFrame(tick);
		}
		function stop() {
			running = false;
			cancelAnimationFrame(raf);
		}

		layout();
		field.render(ctx);

		const ro = new ResizeObserver(() => {
			layout();
			if (!running) field.render(ctx!);
		});
		ro.observe(host);

		// only burn frames while the hero is actually on screen
		const io = new IntersectionObserver((e) => (e[0].isIntersecting ? start() : stop()), {
			threshold: 0
		});
		io.observe(host);

		function onVisibility() {
			if (document.hidden) stop();
			else start();
		}
		function onReduceChange() {
			stop();
			if (reduceMQ.matches) field.render(ctx!);
			else start();
		}

		host.addEventListener('pointermove', onMove);
		document.addEventListener('visibilitychange', onVisibility);
		reduceMQ.addEventListener('change', onReduceChange);

		return () => {
			stop();
			ro.disconnect();
			io.disconnect();
			host.removeEventListener('pointermove', onMove);
			document.removeEventListener('visibilitychange', onVisibility);
			reduceMQ.removeEventListener('change', onReduceChange);
		};
	});
</script>

<div bind:this={host} class="absolute inset-0 overflow-hidden" aria-hidden="true">
	<canvas bind:this={canvas} class="block h-full w-full"></canvas>
</div>
