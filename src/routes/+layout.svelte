<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { page } from "$app/state";
  import { site } from "$lib/data/site";

  let { children } = $props();

  const nav = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" }
  ];
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="relative min-h-screen">
  <header class="absolute inset-x-0 top-0 z-30">
    <div class="shell flex items-center justify-between py-6">
      <a
        href="/"
        class="flex items-center gap-2.5 label text-ink no-underline transition-colors hover:text-accent"
      >
        <span class="block size-1.5 bg-accent"></span>
        {site.name}
      </a>
      <nav class="flex gap-7">
        {#each nav as item (item.href)}
          <a
            href={item.href}
            class="label no-underline transition-colors hover:text-ink {page.url.pathname ===
            item.href
              ? 'text-ink'
              : 'text-faint'}"
            aria-current={page.url.pathname === item.href ? "page" : undefined}
          >
            {item.label}
          </a>
        {/each}
      </nav>
    </div>
  </header>

  {@render children()}

  <div class="shell">
    <footer class="flex items-center justify-between border-t border-rule py-5">
      <span class="label text-fainter">haelp.dev</span>
      <!-- <span class="label text-fainter">{site.location}</span> -->
    </footer>
  </div>
</div>
