<script lang="ts">
  interface Props {
    /** The clip to play. Null keeps the dialog closed and the file unfetched. */
    src: string | null;
    title: string;
    onclose: () => void;
  }

  let { src, title, onclose }: Props = $props();

  let dialog: HTMLDialogElement;
  let video = $state<HTMLVideoElement>();

  $effect(() => {
    if (src) {
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
    <span class="label text-fainter">{title}</span>
    <button
      type="button"
      onclick={() => dialog.close()}
      class="cursor-pointer border-0 bg-transparent p-0 label text-dim transition-colors hover:text-accent"
    >
      Close
    </button>
  </div>

  {#if src}
    <!-- svelte-ignore a11y_media_has_caption -->
    <video
      bind:this={video}
      {src}
      controls
      playsinline
      preload="auto"
      class="block aspect-video max-h-[76vh] w-full bg-black"
    ></video>
  {/if}
</dialog>
