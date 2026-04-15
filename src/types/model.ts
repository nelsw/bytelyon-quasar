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

export const BotTypes: BotType[] = [BotType.News, BotType.Search, BotType.Sitemap];

export type Bot = {
  id: string;
  type: BotType;
  target: string;
  frequency: number;
  blackList: string[];
  workedAt?: Date | undefined;
};

export type BotNode = Bot &
  QTreeNode & {
    botId: string;
    rows: unknown[] | null;
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

export type PageGroup = {
  url: string;
  pages: Page[];
}

export type Page = {
  url: string;
  title: string;
  meta: Record<string, string>;
  paragraphs: string[];
  screenshotKey: string;
  contentKey: string;
  createdAt: string;
}

export type PageData = {
  idx: number;
  url: string;
  title: string;
  img: string;
  png: string;
  json: object;
  serp: object;
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

export type SitemapNode =  {
  url: string;
  label: string;
  children: SitemapNode[];
};

export const BotTypeIcon = (botType: BotType): string => {
  switch (botType) {
    case BotType.Search:
      return 'mdi-web';
    case BotType.Sitemap:
      return 'mdi-sitemap';
    case BotType.News:
      return 'mdi-newspaper';
    default:
      return 'Unknown BotType: ' + (botType as string);
  }
};

export const BotTypeLabel = (botType: BotType): string => {
  switch (botType) {
    case BotType.Search:
      return 'Search';
    case BotType.Sitemap:
      return 'Sitemap';
    case BotType.News:
      return 'News';
    default:
      return 'Unknown BotType: ' + (botType as string);
  }
};
