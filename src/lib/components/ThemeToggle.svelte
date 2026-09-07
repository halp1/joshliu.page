<script lang="ts">
  import { apply, current } from "$lib/theme";

  // Read at click time rather than tracking state: before the first click there
  // is no attribute to read, and the answer depends on the device.
  function toggle() {
    apply(current() === "dark" ? "light" : "dark");
  }
</script>

<button
  type="button"
  onclick={toggle}
  title="Switch between light and dark"
  aria-label="Switch between light and dark"
  class="-m-2 flex cursor-pointer border-0 bg-transparent p-2 text-faint transition-colors hover:text-ink"
>
  <!--
    Both icons are always in the DOM, showing whichever theme a click would
    switch you to. Which one paints is decided in CSS, so the correct icon is
    already on screen before hydration and there is nothing to flash.
  -->
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <g class="only-when-light">
      <!-- moon: currently light, so a click goes dark -->
      <path d="M20.5 14.4A8.5 8.5 0 1 1 9.6 3.5a6.8 6.8 0 0 0 10.9 10.9Z" />
    </g>
    <g class="only-when-dark">
      <!-- sun: currently dark, so a click goes light -->
      <circle cx="12" cy="12" r="4.25" />
      <path
        d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M19.07 4.93L17.3 6.7M6.7 17.3l-1.77 1.77"
      />
    </g>
  </svg>
</button>
