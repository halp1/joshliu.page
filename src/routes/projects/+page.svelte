<script lang="ts">
  import { site } from "$lib/data/site";
  import { groups, projectCount, type Project } from "$lib/data/projects";
  import DemoDialog from "$lib/components/DemoDialog.svelte";
  import DemoTrigger from "$lib/components/DemoTrigger.svelte";
  import { external } from "$lib";

  const title = `Projects — ${site.name}`;
  let demoOf = $state<Project | null>(null);

  const description = `${projectCount} projects by Joshua Liu: engines, libraries, robotics, products and infrastructure.`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{site.url}/projects" />
</svelte:head>

<div class="shell">
  <section class="pt-28 pb-10 md:pt-32">
    <div class="flex flex-col gap-8 md:flex-row md:gap-16">
      <h1
        class="shrink-0 font-display text-5xl leading-[0.96] font-bold tracking-[-0.03em] text-ink md:w-[13.5rem] md:text-6xl"
      >
        Projects
      </h1>
      <p class="max-w-[35rem] text-[14.5px] leading-[1.95] text-dim">
        {projectCount} of the best projects I've built. Projects are grouped by category, and starred projects are
        my most advanced and impressive work.
      </p>
    </div>
  </section>

  {#each groups as group (group.name)}
    <section class="pt-10">
      <div class="flex items-baseline justify-between pb-4">
        <h2 class="label text-ink">{group.name}</h2>
        <span class="label text-fainter">{String(group.projects.length).padStart(2, "0")}</span>
      </div>

      {#each group.projects as project (project.name)}
        <article
          class="flex flex-col gap-2 border-t border-rule py-4 md:flex-row md:items-baseline md:gap-7"
        >
          <!-- pl-5 is unconditional so names stay aligned whether or not a row is starred -->
          <h3
            class="relative shrink-0 pl-5 font-display text-[17px] font-medium tracking-[-0.008em] text-ink md:w-[11.5rem]"
          >
            {#if project.standout}
              <svg
                class="absolute top-[0.42em] left-0 text-accent"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="img"
                aria-label="Pick"
              >
                <path
                  d="M12 2.4l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.4l-5.88 3.09 1.12-6.55L2.48 9.3l6.58-.96z"
                />
              </svg>
            {/if}
            {project.name}
          </h3>
          <div class="flex grow flex-col items-start gap-2.5">
            <p class="text-[13px] leading-[1.65] text-dim">{project.blurb}</p>
            {#if project.demo}
              <DemoTrigger onclick={() => (demoOf = project)} />
            {/if}
          </div>
          <span class="shrink-0 label text-faint md:w-[14rem] md:text-right">{project.tech}</span>
          <span class="flex shrink-0 flex-col gap-2 md:w-[6rem] md:items-end">
            {#if project.live}
              <a
                {...external(project.live)}
                class="label whitespace-nowrap text-dim no-underline hover:text-accent"
              >
                Live &nearr;
              </a>
            {/if}
            {#if project.href}
              <a
                {...external(project.href)}
                class="label whitespace-nowrap text-dim no-underline hover:text-accent"
              >
                Source &nearr;
              </a>
            {:else if !project.live && !project.package}
              <span class="label whitespace-nowrap text-fainter">Private</span>
            {/if}
            {#if project.package}
              <a
                {...external(project.package.link)}
                class="label whitespace-nowrap text-dim no-underline hover:text-accent"
              >
                {project.package.name} &nearr;
              </a>
            {/if}
          </span>
        </article>
      {/each}
    </section>
  {/each}

  <!-- <section class="pt-16 pb-14">
    <div class="flex flex-col gap-8 border-t border-rule pt-11 md:flex-row md:gap-16">
      <h2 class="shrink-0 pt-1 label text-fainter md:w-[13.5rem]">Not listed</h2>
      <p class="max-w-[35rem] text-[13px] leading-[1.8] text-faint">
        Around 180 more repositories exist, most of them from high school and most of them not worth
        your time. Team projects I contributed to but didn&rsquo;t write are credited to the people
        who did.
      </p>
    </div>
  </section> -->
</div>

<DemoDialog
  demo={demoOf?.demo ?? null}
  title={demoOf?.name ?? ""}
  onclose={() => (demoOf = null)}
/>
