<script lang="ts">
  /** Opens a project's demo clip. Shared so the home page and the projects
      page cannot drift apart on wording or styling. */
  let { onclick }: { onclick: () => void } = $props();
</script>

<button
  type="button"
  {onclick}
  class="flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 label text-accent transition-opacity hover:opacity-70"
>
  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6 3.5l14 8.5-14 8.5z" />
  </svg>
  See it in action
</button>
