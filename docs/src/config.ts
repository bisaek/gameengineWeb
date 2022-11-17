export const SITE = {
  title: "Huggerengine Docs",
  description: "the officel Documentation for huggerengine",
  defaultLanguage: "en_US",
};

export const OPEN_GRAPH = {
  image: {
    src: "https://github.com/withastro/astro/blob/main/assets/social/banner-minimal.png?raw=true",
    alt:
      "astro logo on a starry expanse of space," +
      " with a purple saturn-like planet floating in the right foreground",
  },
  twitter: "astrodotbuild",
};

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
  title: string;
  description: string;
  layout: string;
  image?: { src: string; alt: string };
  dir?: "ltr" | "rtl";
  ogLocale?: string;
  lang?: string;
};

export const KNOWN_LANGUAGES = {
  English: "en",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/bisaek/huggerengine/tree/master/docs`;

export const COMMUNITY_INVITE_URL = `https://discord.gg/jQ9rcnJZWX`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: "topics",
  appId: "N7XXWX2M9E",
  apiKey: "32fac41c199f7f51d53dc3787c11748a",
};

export type Sidebar = Record<
  typeof KNOWN_LANGUAGE_CODES[number],
  Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
  en: {
    "Getting Started": [
      { text: "Introduction", link: "en/introduction" },
      { text: "Installation", link: "en/Installation" },
      { text: "Page 3", link: "en/page-3" },
    ],
    "Another Section": [{ text: "Page 4", link: "en/page-4" }],
    Components: [{ text: "Collision", link: "en/components/collision" }],
  },
};
