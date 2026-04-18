import type { QTreeNode } from 'quasar';

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

export const NewBot = (botType: BotType): Bot => ({
  id: '',
  type: botType,
  target: '',
  frequency: 1,
  blackList: [],
});

export const IsBotNew = (bot: Bot): boolean => bot.id === '';

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
  serp: object;
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

export const BotTypeDescription = (botType: BotType): string => {
  switch (botType) {
    case BotType.Search:
      return '';
    case BotType.Sitemap:
      return '';
    case BotType.News:
      return 'Aggregate news articles from popular & reputable digital publishers & RSS feeds.';
    default:
      return 'Unknown BotType: ' + (botType as string);
  }
};
