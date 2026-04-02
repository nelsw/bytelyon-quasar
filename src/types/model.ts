import type { AxiosBasicCredentials } from 'axios';
import type { QTreeNode } from 'quasar';

export type Credentials = AxiosBasicCredentials;

export interface Err {
  error: string;
}

export const enum BotType {
  Search = 'search',
  Sitemap = 'sitemap',
  News = 'news',
}

export type Bot = {
  id: string;
  type: BotType;
  target: string;
  frequency: number;
  blackList: string[];
};

export type BotNode = Bot & QTreeNode & {
  botId: string;
  rows: unknown[] | null;
};

export type BotNewsResult = BotNode & {
  url: string;
  title: string;
  source: string;
  description: string;
  publishedAt: string;
  body: string[];
  image: string;
};

export type BotSearchResult = BotNode & {
  url: string;
  title: string;
  img: string;
  html: string;
  serp: object;
};

export type SearchBotData = {
  url: string;
  title: string;
  userID: string;
  createdAt: number;
  target: string;
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

export interface SitemapRow extends Record<string, unknown> {
  url: string;
  isExternal: boolean;
}

export type Article = {
  title: string;
  body: string;
  summary: string;
  tags: string[];
  image: string;
  prompt: string;
  publishedAt: string;
}
