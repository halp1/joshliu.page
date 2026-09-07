<script lang="ts">
	import { site } from '$lib/data/site';
	import { groups, projectCount } from '$lib/data/projects';
	import { external } from '$lib';

	const title = `Projects — ${site.name}`;
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
			<p class="max-w-[35rem] text-[13.5px] leading-[1.95] text-dim">
				{projectCount} things worth keeping, grouped by what they are rather than when I made them. Some
				are closed for now; a few of those will open up. Where there&rsquo;s no link, there&rsquo;s no
				public source yet.
			</p>
		</div>
	</section>

	{#each groups as group (group.name)}
		<section class="pt-10">
			<div class="flex items-baseline justify-between pb-4">
				<h2 class="label text-ink">{group.name}</h2>
				<span class="label text-fainter">{String(group.projects.length).padStart(2, '0')}</span>
			</div>

			{#each group.projects as project (project.name)}
				<article
					class="flex flex-col gap-2 border-t border-rule py-4 md:flex-row md:items-baseline md:gap-7"
				>
					<h3
						class="shrink-0 font-display text-[17px] font-medium tracking-[-0.008em] text-ink md:w-[10.75rem]"
					>
						{project.name}
					</h3>
					<p class="grow text-xs leading-[1.65] text-dim">{project.blurb}</p>
					<span class="shrink-0 label text-faint md:w-[11.875rem] md:text-right"
						>{project.tech}</span
					>
					<span class="flex shrink-0 gap-4 md:w-[8.5rem] md:justify-end">
						{#if project.live}
							<a {...external(project.live)} class="label text-dim no-underline hover:text-accent">
								Live &nearr;
							</a>
						{/if}
						{#if project.href}
							<a {...external(project.href)} class="label text-dim no-underline hover:text-accent">
								Source &nearr;
							</a>
						{:else if !project.live}
							<span class="label text-fainter">Private</span>
						{/if}
					</span>
				</article>
			{/each}
		</section>
	{/each}

	<section class="pt-16 pb-14">
		<div class="flex flex-col gap-8 border-t border-rule pt-11 md:flex-row md:gap-16">
			<h2 class="shrink-0 pt-1 label text-fainter md:w-[13.5rem]">Not listed</h2>
			<p class="max-w-[35rem] text-xs leading-[1.8] text-faint">
				Around 180 more repositories exist, most of them from high school and most of them not worth
				your time. Team projects I contributed to but didn&rsquo;t write are credited to the people
				who did.
			</p>
		</div>
	</section>
</div>
