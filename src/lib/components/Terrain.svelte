<script lang="ts">
  import { ContourField } from "./contour";

  interface Props {
    /** Peak line opacity multiplier, 0–1. */
    intensity?: number;
    /** How far the field trails the pointer, 0–1. */
    lag?: number;
  }

  let { intensity = 0.6, lag = 0.6 }: Props = $props();

  /** Matches the light theme's line contrast to the dark theme's. Derived, not
      guessed: the index contour needs 1.18x and the minor 1.09x to draw level. */
  const LIGHT_BOOST = 1.2;

  let host: HTMLDivElement;
  let canvas: HTMLCanvasElement;

  $effect(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const field = new ContourField({ intensity, lag });
    const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineMQ = window.matchMedia("(pointer: fine)");
    const schemeMQ = window.matchMedia("(prefers-color-scheme: dark)");

    /**
     * Canvas cannot read a CSS variable, and --color-ink is a light-dark()
     * pair, so take the host's own resolved colour instead: the browser has
     * already picked a side by the time it is computed.
     */
    function syncInk() {
      const parts = getComputedStyle(host).color.match(/-?[\d.]+/g);
      if (!parts || parts.length < 3) return;
      const [r, g, b] = parts.map(Number);
      field.ink = `${r},${g},${b}`;
      // Alpha is not symmetric between the two grounds: the same value lays
      // far less contrast onto paper than it does onto ink, so the light theme
      // needs a push to land at the dark theme's weight.
      const inkIsDark = r * 0.299 + g * 0.587 + b * 0.114 < 128;
      field.intensity = inkIsDark ? intensity * LIGHT_BOOST : intensity;
    }

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
    syncInk();
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
    function onThemeChange() {
      syncInk();
      if (!running) field.render(ctx!);
    }
    function onReduceChange() {
      stop();
      if (reduceMQ.matches) field.render(ctx!);
      else start();
    }

    // data-theme covers the toggle; the media query covers the device changing
    // underneath us while we are following it.
    const mo = new MutationObserver(onThemeChange);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    host.addEventListener("pointermove", onMove);
    document.addEventListener("visibilitychange", onVisibility);
    reduceMQ.addEventListener("change", onReduceChange);
    schemeMQ.addEventListener("change", onThemeChange);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      host.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMQ.removeEventListener("change", onReduceChange);
      schemeMQ.removeEventListener("change", onThemeChange);
    };
  });
</script>

<div bind:this={host} class="absolute inset-0 overflow-hidden text-ink" aria-hidden="true">
  <canvas bind:this={canvas} class="block h-full w-full"></canvas>
</div>
