<script lang="ts">
  import type { Demo } from "$lib/data/projects";

  interface Props {
    /** The clip to play. Null keeps the dialog shut and nothing downloaded. */
    demo: Demo | null;
    title: string;
    onclose: () => void;
  }

  let { demo, title, onclose }: Props = $props();

  let dialog: HTMLDialogElement;
  let video = $state<HTMLVideoElement>();

  $effect(() => {
    if (demo) {
			video?.focus();
      dialog.showModal();
      // The click that opened this counts as the gesture, so sound is allowed.
      video?.play().catch(() => {
        /* the browser declined; the controls still work */
      });
    } else if (dialog.open) {
      dialog.close();
    }
  });

  /** Esc, the close button and the backdrop all land here. */
  function handleClose() {
    video?.pause();
    onclose();
  }

  // <dialog> makes a backdrop click land on the dialog itself, so anything that
  // hits the panel inside stops short of this.
  function onBackdrop(event: MouseEvent) {
    if (event.target === dialog) dialog.close();
  }
</script>

<dialog
  bind:this={dialog}
  onclose={handleClose}
  onclick={onBackdrop}
  aria-label="{title} demo"
  class="m-auto max-w-[min(58rem,92vw)] border border-rule bg-ground p-0 backdrop:bg-black/70"
>
  <div class="flex items-baseline justify-between gap-6 border-b border-rule px-4 py-3">
    <!-- min-w-0 lets a long caption wrap instead of shoving Close off the edge -->
    <div class="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1">
      <span class="shrink-0 label text-fainter">{title}</span>
      {#if demo}
        <span id="demo-caption" class="text-[13px] leading-[1.5] text-dim">{demo.caption}</span>
      {/if}
    </div>
    <button
      type="button"
      onclick={() => dialog.close()}
      class="shrink-0 cursor-pointer border-0 bg-transparent p-0 label text-dim transition-colors hover:text-accent"
    >
      Close
    </button>
  </div>

  {#if demo}
    <!-- The caption sits in the header, so <figure>/<figcaption> is out (a
         figcaption has to be a direct child). aria-describedby ties them
         together regardless of where each one lives in the DOM. -->
    <!-- svelte-ignore a11y_media_has_caption -->
    <video
      bind:this={video}
      controls
      playsinline
      preload="auto"
      volume={0.25}
      aria-describedby="demo-caption"
      class="block aspect-video max-h-[76vh] w-full bg-black"
    >
      {#each demo.sources as source (source.src)}
        <source src={source.src} type={source.type} />
      {/each}
    </video>
  {/if}
</dialog>
