<script lang="ts">
  import Terrain from "$lib/components/Terrain.svelte";
  import { site, currently, beyond, wentWrong } from "$lib/data/site";
  import { featured } from "$lib/data/projects";
  import { external } from "$lib";
</script>

<svelte:head>
  <title>{site.name}</title>
  <meta name="description" content={site.description} />
  <meta property="og:title" content={site.name} />
  <meta property="og:description" content={site.description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={site.url} />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<!-- Hero: full viewport, and full bleed so the terrain runs edge to edge -->
<section class="relative flex h-dvh flex-col justify-end">
  <Terrain />
  <div
    class="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-ground/90 to-transparent"
  ></div>

  <div class="shell relative z-10 pb-16 md:pb-20">
    <h1
      class="font-display text-[13vw] leading-[0.94] font-bold tracking-[-0.03em] text-ink sm:text-6xl md:text-[5.25rem]"
    >
      {site.name}
    </h1>
    <p class="mt-5 max-w-[30rem] text-[14.5px] leading-[1.85] text-dim">
      {site.role}.<br />
      I build embedded systems, maintain open-source packages, and develop software to serve the communities
      I'm a part of.
    </p>
  </div>

  <div class="shell relative z-10 flex items-center justify-between pb-6 md:pb-7">
    <!-- <span class="label text-fainter">{site.from} &nbsp;&rarr;&nbsp; {site.location}</span> -->
    <span class="hidden label text-fainter sm:block"
      >University of Illinois Urbana Champaign &middot; Grainger School of Engineering &middot;
      Computer Science &middot; 2030</span
    >
  </div>
</section>

<div class="shell">
  <!-- About -->
  <section class="border-t border-rule py-16 md:py-20">
    <div class="flex flex-col gap-12 md:flex-row md:gap-16">
      <div class="flex shrink-0 flex-col gap-6">
        <img
          src="/joshua.jpg"
          alt="Joshua Liu"
          width="200"
          height="200"
          loading="lazy"
          decoding="async"
          class="size-[200px] border border-rule object-cover"
        />
        <!-- <span class="label text-fainter">{site.from}</span> -->
      </div>

      <div class="flex max-w-[35rem] flex-col gap-5">
        <p class="text-[14.5px] leading-[1.95] text-ink-2">
          I'm a first-year CS student at Illinois from Lexington, Massachusetts.
        </p>
        <p class="text-[14.5px] leading-[1.95] text-dim">
          <!-- Most of what I build starts with wanting to know how something works. I reverse-engineered
					TETR.IO's protocol and rebuilt its client from scratch, which turned into a library other
					people now depend on. Then the harder question underneath it got interesting — what the
					best available move actually is — and I&rsquo;ve rewritten a search engine three times
					looking for the answer. -->
          Everything I build starts with a single question: <u>"What if there was a better way?"</u> There
          is an enormous amount of data in the world that is presented in a way that is inconvenient to
          access and difficult to understand. Hundreds of systems are open for automation, but only if
          you can learn to speak their language. The things I make are what close this gap between the
          modern internet and everyday people.
        </p>
        <p class="text-[14.5px] leading-[1.95] text-dim">
          I also have a deep passion for robotics and writing embedded software. I spent four years
          on a VEX robotics team, and what I loved was that the code had to survive contact with a
          real robot in a dynamic environment. Embedded programming deals with the imperfect world
          in a way the rest of CS doesn't. That's what makes embedded special: there's always room
          for improvement and innovation. There's always a better way.
        </p>
      </div>

      <div class="flex grow flex-col gap-4">
        <h2 class="label text-fainter">Currently</h2>
        <ul class="flex flex-col gap-3.5">
          {#each currently as item (item.org)}
            <li class="text-[13px] leading-relaxed text-ink-2">
              {item.org}<br /><span class="text-faint">{item.what}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </section>

  <!-- Selected work -->
  <section class="border-t border-rule pt-16 md:pt-20">
    <div class="flex items-baseline justify-between pb-6">
      <h2 class="label text-fainter">Selected work</h2>
      <a href="/projects" class="label text-accent no-underline hover:text-ink">
        All projects &rarr;
      </a>
    </div>

    {#each featured as project, i (project.name)}
      <article class="flex flex-col gap-5 border-t border-rule py-7 md:flex-row md:gap-7">
        <span class="shrink-0 pt-1.5 label text-accent md:w-7">
          {String(i + 1).padStart(2, "0")}
        </span>

        <div class="flex max-w-[37.5rem] grow flex-col gap-3">
          <h3 class="font-display text-2xl font-medium tracking-[-0.015em] text-ink">
            {project.name}
          </h3>
          <p class="text-[13.5px] leading-[1.7] text-dim">{project.blurb}</p>
          {#if project.stats}
            <dl class="flex flex-wrap gap-x-5 gap-y-1 pt-1">
              {#each project.stats as stat (stat)}
                <dd class="label text-ink-2">{stat}</dd>
              {/each}
            </dl>
          {/if}
        </div>

        <div class="flex shrink-0 flex-col gap-2 md:w-[11.5rem] md:text-right">
          <span class="label whitespace-nowrap text-faint">{project.tech}</span>
          {#if project.live}
            <a {...external(project.live)} class="label text-dim no-underline hover:text-accent">
              Live &nearr;
            </a>
          {/if}
          {#if project.href}
            <a {...external(project.href)} class="label text-dim no-underline hover:text-accent">
              Source &nearr;
            </a>
          {:else}
            <span class="label text-fainter">Source private</span>
          {/if}
          {#if project.package}
            <a
              {...external(project.package.link)}
              class="label text-dim no-underline hover:text-accent"
            >
              {project.package.name} &nearr;
            </a>
          {/if}
        </div>
      </article>
    {/each}
  </section>

  <!-- Failure story -->
  <!-- <section class="mt-10 border-t border-rule py-16">
    <div class="flex flex-col gap-8 md:flex-row md:gap-16">
      <h2 class="shrink-0 pt-1 label text-fainter md:w-[13.5rem]">What went wrong</h2>
      <div class="flex max-w-[35rem] flex-col gap-4">
        <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span class="label text-accent">{wentWrong.project}</span>
          <span class="label text-faint">{wentWrong.tech}</span>
        </div>
        {#each wentWrong.paragraphs as para (para)}
          <p class="text-[14.5px] leading-[1.95] text-dim">{para}</p>
        {/each}
      </div>
    </div>
  </section> -->

  <!-- Beyond code -->
  <section class="border-t border-rule py-16">
    <div class="flex flex-col gap-8 md:flex-row md:gap-16">
      <h2 class="shrink-0 pt-1 label text-fainter md:w-[13.5rem]">Beyond code</h2>
      <div class="flex max-w-[40rem] flex-col gap-4">
        {#each beyond as item (item.lead)}
          <p class="text-[13.5px] leading-[1.7] text-dim">
            <span class="text-ink-2">{item.lead}</span>
            {item.rest}
          </p>
        {/each}
        <p class="pt-1.5 text-[13.5px] leading-[1.7] text-faint">
          For fun: Long-distance biking, hiking the White Mountains, and currently Sichuan and
          Mexican cooking.
        </p>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section class="border-t border-rule py-20">
    <div class="flex flex-col gap-8 md:flex-row md:gap-16">
      <h2 class="shrink-0 pt-2 label text-fainter md:w-[13.5rem]">Contact</h2>
      <div class="flex grow flex-col gap-5">
        <a
          href="mailto:{site.email}"
          class="font-display text-2xl font-medium tracking-[-0.022em] text-ink no-underline hover:text-accent sm:text-3xl md:text-[2.125rem]"
        >
          {site.email}
        </a>
        <div class="flex flex-wrap gap-x-6 gap-y-3 pt-1">
          <a {...external(site.links.github)} class="label text-dim no-underline hover:text-accent">
            GitHub
          </a>
          <a
            {...external(site.links.linkedin)}
            class="label text-dim no-underline hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            {...external(site.links.instagram)}
            class="label text-dim no-underline hover:text-accent"
          >
            Instagram
          </a>
          {#if site.resume}
            <a {...external(site.resume)} class="label text-dim no-underline hover:text-accent"
              >Résumé PDF</a
            >
          {/if}
        </div>
      </div>
    </div>
  </section>
</div>
