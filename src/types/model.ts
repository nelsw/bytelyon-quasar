export type entry<K, V> = { k: K; v: V };

export class Model<K, V> {
  e: entry<K, V>[];

  constructor(e?: entry<K, V>[]) {
    this.e = e ?? [];
  }

  set = (k: K, v: V): V => {
    this.remove(k);
    this.e.push({ k, v });
    return v;
  };

  get = (k: K): V | undefined => this.e.find((e) => e.k === k)?.v;

  remove = (k: K) => {
    const idx = this.e.findIndex((e) => e.k === k);
    if (idx > -1) this.e.splice(idx, 1);
  };
}

export class Map<T> {
  map: { [id: string]: T };

  constructor() {
    this.map = {};
  }

  get = (id: string, t: T): T => this.map[id] ?? t;

  set = (id: string, value: T): T => (this.map[id] = value);
}

export const enum BotType {
  Search = 'search',
  Sitemap = 'sitemap',
  News = 'news',
}

export const BotTypes: BotType[] = [BotType.News, BotType.Search, BotType.Sitemap];

export type Bot = {
  id: string;
  type: BotType;
  target: string;
  frequency: number;
  blackList: string[];
  headless?: boolean | undefined;
  workedAt?: Date | undefined;
};

export type Article = {
  title: string;
  body: string;
  summary: string;
  tags: string[];
  image: string;
  publishedAt: string;
  prompt?: string;
  url?: string;
  keywords?: string[];
};

export type SearchBotData = {
  botId: string;
  id: string;
  url: string;
  title: string;
  userId: string;
  createdAt: number;
  target: string;
  label: string;
  pages: PageData[];
};

export type Page = Record<string, unknown> & {
  url: string;
  title: string;
  meta: Record<string, string>;
  paragraphs: string[];
  screenshotKey: string;
  contentKey: string;
  createdAt: string;
};

export type PageData = {
  idx: number;
  url: string;
  title: string;
  img: string;
  png: string;
  json: object;
  serp: Serp;
};

export type Serp = {
  organic: SerpResult[];
  people_also_search_for: SerpResult[];
  people_also_ask: SerpResult[];
};

export type SerpResult = {
  link: string;
  position: number;
  snippet: string;
  source: string;
  title: string;
};

export type NewsBotResult = {
  id: string;
  botId: string;
  url: string;
  title: string;
  source: string;
  description: string;
  publishedAt: string;
  body: string[];
  image: string;
  target: string;
  type: BotType;
};

export type SitemapNode = {
  botId: string;
  url: string;
  label: string;
  children: SitemapNode[];
};
