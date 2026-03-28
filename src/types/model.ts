import type { AxiosBasicCredentials } from 'axios';
import type { QTreeNode } from 'quasar';

export const IsOldBot = (bot: BotNode) => !IsNewBot(bot);
export const IsNewBot = (bot: BotNode) => bot.id.length < 10;

export type Bot<T = BotType> = {
  userID: string;
  type: T;
  frequency: number;
  target: string;
  blackList: string[];
  updatedAt: number | null;
};

export type BotResult<T = BotType, D = unknown> = {
  userId: string;
  botId: string;
  id: string;
  target: string;
  type: T,
  data: D;
}

export type BotNewsResult = BotResult<BotType.News> & {
  url: string;
  title: string;
  source: string;
  description: string;
  publishedAt: string;
};



export type BotSearchResult = BotResult<BotType.Search> & {
  url: string;
  title: string;
  img: string;
  html: string;
  serp: object;
};

export type NewsBot = Bot<BotType.News>;
export type SearchBot = Bot<BotType.Search> & { headless: boolean };
export type SitemapBot = Bot<BotType.Sitemap>;

export type SearchBotData = {
  userID: string;
  createdAt: number;
  target: string;
  url: string;
  title: string;
  pages: PageData[];
};

export type PageData = {
  idx: number;
  url: string;
  title: string;
  img: string;
  png: string;
  json: object;
};



export const enum BotType {
  Search = 'search',
  Sitemap = 'sitemap',
  News = 'news',
}

export interface SitemapRow extends Record<string, unknown> {
  url: string;
  isExternal: boolean;
}

export type Creds = AxiosBasicCredentials;

export interface Err {
  error: string;
}

export type Node<T> = QTreeNode<T> & {
  id: string;
};

export type BotNode<T = unknown> = Node<T> & {
  botId: string;
  frequency: number;
  target: string;
  type: BotType;
  rows: unknown[] | null;
};
