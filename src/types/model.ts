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

export type Sitemap = {
  created_at: Date;
  updated_at: Date;
  domain: string;
  nodes: SitemapNode[];
};

export type SitemapNode = {
  label: string;
  url: string;
  children?: SitemapNode[];
};

export interface Customer {
  id: string;
  name: string;
  city: string;
  state: string;
  email: string;
  tags: string[];
  orders: number;
  phone: string;
  spent: number;
}

export interface Order {
  id: string;
  price: number;
  refunded: number;
  shipping: number;
  discounts: number;
  createdAt: Date;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface SEO {
  backlink?: string | undefined;
  keywords?: string[];
}

export interface Post extends SEO {
  title: string;
  body: string;
  summary: string;
  tags: string[];
  imgSrc: string;
  imgAlt: string;
  publishedAt: string;
}

export interface Prompt {
  system: string;
  message: string;
  result: string;
  html: boolean;
}

export class BlogPost implements Post {
  id: string;
  title: string;
  body: string;
  summary: string;
  tags: string[];
  imgSrc: string;
  imgAlt: string;
  publishedAt: string;
  backlink?: string | undefined;
  keywords?: string[];

  constructor() {
    this.id = '';
    this.title = '';
    this.body = '';
    this.summary = '';
    this.tags = [];
    this.imgSrc = '';
    this.imgAlt = '';
    this.publishedAt = '';
    this.backlink = '';
  }
}
