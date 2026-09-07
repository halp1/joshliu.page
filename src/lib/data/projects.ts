export type Project = {
  name: string;
  blurb: string;
  tech: string;
  /** null means there is no public source yet. */
  href: string | null;
  /** The running thing, where one is reachable. Verified 2026-09-06. */
  live?: string;
  stats?: string[];
  /** Position on the home page, 1–4. Absent means projects page only. */
  featured?: number;
};

export type Group = {
  name: string;
  projects: Project[];
};

export const groups: Group[] = [
  {
    name: "Engines & simulation",
    projects: [
      {
        name: "MochBot",
        blurb: "A versus Tetris bot people train against.",
        tech: "C++ · TypeScript",
        href: null,
        stats: ["+20,000 players reached", "~1,300 weekly active users", "~6,000 games/day"],
        featured: 1,
        live: "https://us.posthog.com/shared/DiMu37UmgBfqhBXzv6_PNatYYp0aGA"
      },
      {
        name: "Falcon",
        blurb:
          "A search engine for tetromino stackers. Rust, three rewrites, each one faster than the last.",
        tech: "Rust",
        href: "https://github.com/halp1/falcon-2"
      },
      {
        name: "Mosaic",
        blurb:
          "Replay viewer with opener detection. Simulates the game to tell you what you actually played.",
        tech: "SvelteKit · PIXI · WASM",
        href: null
      }
    ]
  },
  {
    name: "Libraries",
    projects: [
      {
        name: "Triangle",
        blurb:
          // "I reverse-engineered the TETR.IO protocol and wrote a headless client for it. It's the only open-source one, and most third-party tooling for the game is built on it.",
          "A fuly headless and reverse-engineered client for the game TETR.IO. Originally built to power MochBot, but now, most third-party tooling for the game uses this library.",
        tech: "TypeScript",
        href: "https://github.com/halp1/triangle",
        stats: ["33 stars", "200+ downloads/week", "@haelp/teto"],
        featured: 2,
        live: "https://triangle.haelp.dev"
      },
      {
        name: "@haelp/auth",
        blurb: "JWT authentication across subdomains, small enough to read in one sitting.",
        tech: "TypeScript",
        href: "https://github.com/haelp-dev/auth"
      },
      {
        name: "@haelp/joystick",
        blurb: "Virtual joystick for browser games. Written years ago; people still install it.",
        tech: "JavaScript",
        href: "https://github.com/halp1/joystick"
      }
    ]
  },
  {
    name: "Robotics",
    projects: [
      {
        name: "push-back",
        blurb:
          "Rust on a VEX V5 brain. My own motion library, Monte Carlo localization for working out where the robot actually is, and a Svelte debugger that reads telemetry off it over a protocol I wrote down.",
        tech: "Rust · vexide",
        href: "https://github.com/halp1/push-back",
        featured: 4
      },
      {
        name: "scoutr-vrc",
        blurb:
          "Scouting app for VEX competitions — match and award notifications, video capture, live standings.",
        tech: "React Native · Supabase",
        href: "https://github.com/halp1/scoutr-vrc"
      },
      {
        name: "vex-code-guide",
        blurb:
          "What I worked out about robot localization, written down so other teams didn't have to.",
        tech: "Documentation",
        href: "https://github.com/halp1/vex-code-guide"
      },
      {
        name: "gif-pros",
        blurb:
          "GIF decoder for the VEX PROS runtime, with transparency. For putting animations on a robot screen.",
        tech: "C++",
        href: "https://github.com/halp1/gif-pros"
      },
      {
        name: "pathgen",
        blurb: "Bezier path planner for VEX autonomous routines.",
        tech: "TypeScript",
        href: "https://github.com/halp1/pathgen"
      }
    ]
  },
  {
    name: "Products",
    projects: [
      {
        name: "UIEats",
        blurb:
          "UIUC publishes its dining menus with unreliable allergen data. I scraped the system it's generated from and built a better app that you can trust when your life is at stake.",
        tech: "SvelteKit · Docker",
        href: "https://github.com/halp1/uieats",
        featured: 3,
        live: "https://uieats.haelp.dev"
      },
      {
        name: "Zoron",
        blurb:
          "A replacement front end for the Aspen student information system, built on a reverse-engineered API.",
        tech: "SvelteKit · MongoDB",
        href: null
      },
      {
        name: "course-finder",
        blurb: "Watches UIUC course sections and pushes a notification the second a seat opens.",
        tech: "SvelteKit · Web Push",
        href: null
      },
      {
        name: "LexYouth Manager",
        blurb: "Tutoring management for a local nonprofit — scheduling and service-hour reporting.",
        tech: "Next.js · MongoDB",
        href: null
      }
    ]
  },
  {
    name: "Infrastructure",
    projects: [
      {
        name: "auth",
        blurb: "An OpenID Connect provider. Every service below signs in through it.",
        tech: "SvelteKit · SQLite",
        href: null,
        live: "https://auth.haelp.dev"
      },
      {
        name: "cdn",
        blurb: "Personal file host with Drive-backed storage.",
        tech: "SvelteKit · Docker",
        href: null,
        live: "https://cdn.haelp.dev"
      },
      {
        name: "link",
        blurb: "URL shortener.",
        tech: "SvelteKit · SQLite",
        href: null,
        live: "https://link.haelp.dev"
      },
      {
        name: "secrets",
        blurb: "Share a credential once, then it's gone.",
        tech: "SvelteKit",
        href: null
      }
    ]
  },
  {
    name: "Tools & extensions",
    projects: [
      {
        name: "uiuc-icons",
        blurb:
          "Chrome extension that gives each Canvas course its own favicon, so the tabs stop being identical.",
        tech: "TypeScript",
        href: null,
        live: "https://secrets.haelp.dev"
      },
      {
        name: "amber",
        blurb: "Plugin-based JavaScript deobfuscator.",
        tech: "JavaScript",
        href: "https://github.com/halp1/amber"
      },
      {
        name: "flamewall",
        blurb: "macOS menu-bar firewall — per-app network filtering through a system extension.",
        tech: "Swift",
        href: null
      },
      {
        name: "muted",
        blurb: "System-wide microphone mute in the menu bar.",
        tech: "Swift",
        href: null
      },
      {
        name: "badgeify",
        blurb: "Mirrors app unread badges into the macOS menu bar.",
        tech: "Swift",
        href: null
      },
      {
        name: "games",
        blurb: "Small browser games, fully offline after first load.",
        tech: "SvelteKit",
        href: null,
        live: "https://games.haelp.dev"
      },
      {
        name: "tools",
        blurb: "Bulk image viewer, scoreboard, counter. Things I needed once.",
        tech: "SvelteKit",
        href: null,
        live: "https://tools.haelp.dev"
      },
      {
        name: "AoPS userscripts",
        blurb: "Userscripts for Art of Problem Solving. 2023.",
        tech: "JavaScript",
        href: "https://github.com/halp1/AoPS-Scripts"
      }
    ]
  }
];

export const featured: Project[] = groups
  .flatMap((g) => g.projects)
  .filter((p) => p.featured !== undefined)
  .sort((a, b) => a.featured! - b.featured!);

export const projectCount: number = groups.reduce((n, g) => n + g.projects.length, 0);
