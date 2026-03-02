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

export type NewsBot = Bot<BotType.News>;
export type SearchBot = Bot<BotType.Search> & { headless: boolean };
export type SitemapBot = Bot<BotType.Sitemap>;

export type NewsBotData = {
  userID: string;
  url: string;
  title: string;
  source: string;
  description: string;
  published: number;
};

export type SitemapBotData = {
  userID: string;
  createdAt: number;
  domain: string;
  url: string;
  relative: string[];
  remote: string[];
};

export type SearchBotData = {
  userID: string;
  createdAt: number;
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

export type BotData = SearchBotData | SitemapBotData | NewsBotData;
export interface BotTable<T> {
  Bot: Bot;
  rows: Array<T>;
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
