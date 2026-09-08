export type Project = {
  name: string;
  blurb: string;
  tech: string;
  /** null means there is no public source yet. */
  href: string | null;
  /** The running thing, where one is reachable. Verified 2026-09-06. */
  live?: string;
  /** The package details, if it's a library. */
  package?: {
    name: string;
    link: string;
  };
  stats?: string[];
  /** Position on the home page, 1–4. Absent means projects page only. */
  featured?: number;
  /**
   * Worth a stranger's attention first. Kept separate from `featured`, which is
   * capped at four by the home page's layout — this set can grow.
   */
  standout?: boolean;
  /** A clip under static/demos, played in a dialog rather than downloaded. */
  demo?: string;
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
        blurb:
          "A versus Tetris bot people train against. The strongest and most popular Tetris engine ever created to date.",
        tech: "C++ · TypeScript",
        href: null,
        stats: ["+20,000 players reached", "~1,300 weekly active users", "~6,000 games/day"],
        featured: 2,
        standout: true,
        live: "https://us.posthog.com/shared/DiMu37UmgBfqhBXzv6_PNatYYp0aGA"
      },
      {
        name: "Falcon",
        blurb: "A blazingly fast search and evaulation engine for tetromino stackers.",
        tech: "Rust",
        href: "https://github.com/halp1/falcon-2"
      },
      {
        name: "Mosaic",
        blurb:
          "(COMING SOON) A tool that analyzes TETR.IO replays and teaches you how to improve your gameplay.",
        tech: "SvelteKit · Rust · WASM",
        href: null
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
        stats: ["10+ life-threatening incidents avoided"],
        featured: 3,
        standout: true,
        live: "https://uieats.joshliu.page"
      },
      {
        name: "Zoron",
        blurb:
          "A replacement front end for the Aspen student information system. Built on a reverse-engineered API, and includes a day-by-day schedule view and grade push notifications. ",
        tech: "SvelteKit · MongoDB",
        href: null
      },
      {
        name: "course-finder",
        blurb:
          "(COMING SOON) Watches UIUC course sections and pushes a notification the second a seat opens.",
        tech: "SvelteKit · Web Push",
        href: null
      },
      {
        name: "LexYouth Manager",
        blurb:
          "Tutoring management for a local nonprofit, including scheduling and service-hour reporting.",
        tech: "Next.js · MongoDB",
        href: null
      }
    ]
  },
  {
    name: "Libraries",
    projects: [
      {
        name: "Triangle.js",
        blurb:
          "A fully headless and reverse-engineered client for the game TETR.IO. Originally built to power MochBot, but now, most third-party tooling for the game uses this library.",
        tech: "TypeScript",
        href: "https://github.com/halp1/triangle",
        stats: ["33 stars", "200+ downloads/week"],
        featured: 1,
        standout: true,
        live: "https://triangle.haelp.dev",
        package: {
          name: "NPM",
          link: "https://www.npmjs.com/package/@haelp/teto"
        }
      },
      {
        name: "amber",
        blurb: "An extremely powerful plugin-based JavaScript deobfuscator.",
        tech: "Typescript",
        href: "https://github.com/halp1/amber"
      },
      {
        name: "@haelp/auth",
        blurb: "A tiny JWT authentication library that works across subdomains.",
        tech: "TypeScript",
        href: "https://github.com/haelp-dev/auth",
        package: {
          name: "NPM",
          link: "https://www.npmjs.com/package/@haelp/auth"
        }
      },
      {
        name: "@haelp/joystick",
        blurb: "A virtual joystick for browser games.",
        tech: "JavaScript",
        href: "https://github.com/halp1/joystick",
        package: {
          name: "NPM",
          link: "https://www.npmjs.com/package/@haelp/joystick"
        }
      }
    ]
  },
  {
    name: "Robotics",
    projects: [
      {
        name: "push-back",
        blurb:
          "Pioneered Rust in the VEX V5RC robotics competition. Features a fully custom asynchronous motion library and Monte Carlo Localization implementation.",
        tech: "Rust · vexide",
        href: "https://github.com/halp1/push-back",
        demo: "/demos/auton-sample.mp4",
        stats: ["World Record: Autonomous Win Points"],
        featured: 4,
        standout: true
      },
      {
        name: "scoutr-vrc",
        blurb:
          "A scouting app for VEX competitions: match notifications, live standings, and a custom field controller.",
        tech: "React Native · Supabase",
        href: "https://github.com/halp1/scoutr-vrc"
      },
      {
        name: "vex-code-guide",
        blurb:
          "A full guide to odometry and localization using Monte Carlo Localization that teaches both the concepts and the implementation.",
        tech: "Documentation",
        href: "https://github.com/halp1/vex-code-guide"
      },
      {
        name: "gif-pros",
        blurb: "A fork of theol0403/gif-pros updated to support PROS 4.2.1+ and LVGL 8.0+.",
        tech: "C++",
        href: "https://github.com/halp1/gif-pros"
      },
      {
        name: "pathgen",
        blurb:
          "A bezier-based path planner and motion profile generator for VEX autonomous routines.",
        tech: "TypeScript",
        href: "https://github.com/halp1/pathgen"
      }
    ]
  },
  {
    name: "Infrastructure",
    projects: [
      {
        name: "auth",
        blurb: "A custom OpenID Connect provider. Every service below signs in through it.",
        tech: "SvelteKit · SQLite",
        href: "https://github.com/halp1/auth",
        live: "https://auth.haelp.dev"
      },
      {
        name: "cdn",
        blurb: "An S3-based personal file host with Drive-backed storage.",
        tech: "SvelteKit · Docker",
        href: "https://github.com/halp1/cdn",
        live: "https://cdn.haelp.dev",
        standout: true
      },
      {
        name: "link",
        blurb: "A simple URL shortener with analytics and IP tracking.",
        tech: "SvelteKit",
        href: "https://github.com/halp1/link",
        live: "https://link.haelp.dev"
      },
      {
        name: "secrets",
        blurb: "An encrypted credential manager.",
        tech: "SvelteKit",
        href: "https://github.com/halp1/secrets",
        live: "https://secrets.haelp.dev"
      }
    ]
  },
  {
    name: "Tools & extensions",
    projects: [
      {
        name: "uiuc-icons",
        blurb:
          "A Chrome extension that allows you to set custom tab icons for .illinois.edu websites.",
        tech: "TypeScript",
        href: null,
        live: "https://secrets.haelp.dev"
      },
      {
        name: "flamewall",
        blurb: "A macOS menu-bar firewall: per-app network filtering through a system extension.",
        tech: "Swift",
        href: null
      },
      {
        name: "muted",
        blurb:
          "A system-wide microphone mute in the menu bar, turning the dictation key into a mute button.",
        tech: "Swift",
        href: null
      },
      {
        name: "badges",
        blurb: "Mirrors app unread badges into the macOS menu bar.",
        tech: "Swift",
        href: "https://github.com/halp1/badges"
      },
      {
        name: "games",
        blurb: "Small online games I've made.",
        tech: "SvelteKit · Typescript",
        href: "https://github.com/halp1/games",
        live: "https://games.haelp.dev"
      },
      {
        name: "tools",
        blurb: "Miscellaneous tools and utilities, ex. counters, image viewers.",
        tech: "SvelteKit · Typescript",
        href: "https://github.com/halp1/tools",
        live: "https://tools.haelp.dev"
      }
    ]
  }
];

export const featured: Project[] = groups
  .flatMap((g) => g.projects)
  .filter((p) => p.featured !== undefined)
  .sort((a, b) => a.featured! - b.featured!);

export const projectCount: number = groups.reduce((n, g) => n + g.projects.length, 0);
