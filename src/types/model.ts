import type { AxiosBasicCredentials } from 'axios';

export const IsOldBot = (bot: Bot) => !IsNewBot(bot);
export const IsNewBot = (bot: Bot) => bot.updatedAt === null;

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

export type BotSitemapResult = BotResult<BotType.Sitemap> & {
  target: string;
  relative: string[];
  remote: string[];
};

export type BotSearchResult = BotResult<BotType.Search> & {
  ID: string;
  target: string;
  pages: Array<{
    idx: number;
    url: string;
    title: string;
    img: string;
    png: string;
    serp: object;
  }>;
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

export interface BotTable<T = BotType, R = unknown> {
  Bot: Bot<T>;
  result: BotResult;
  rows: Array<R>;
}

export const enum BotType {
  Search = 'search',
  Sitemap = 'sitemap',
  News = 'news',
}

export interface SitemapRow extends Record<string, unknown> {
  URL: string;
  IsExternal: boolean;
}

export type Creds = AxiosBasicCredentials;

export interface Err {
  error: string;
}
