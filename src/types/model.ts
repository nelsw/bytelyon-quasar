export interface Model {
  ID: number;
  CreatedAt: number;
  UpdatedAt: number;
  DeletedAt: number | null;
}

export type Bots = Bot[];
export type BotData = BotDatum[];
export type BotDatum = Search | Sitemap | News;
export interface BotTable {
  Bot: Bot;
  rows: string[] | News[];
}
export interface Bot<T = BotType> extends Model {
  Type: T;
  Frequency: number;
  Target: string;
  BlackList: string[];
}

export const enum BotType {
  Search = 'search',
  Sitemap = 'sitemap',
  News = 'news',
}

export interface Search extends Model {
  Bot: Bot;
  BotID: number;
  Pages: Page[];
}

export interface Page extends Model {
  SearchID: number;
  URL: string;
  Title: string;
  JSON: object | null;
}

export interface Sitemap extends Model {
  Bot: Bot;
  BotID: number;
  URL: string;
  Domain: string;
  Relative: string[];
  Remote: string[];
}

export interface News extends Model {
  Bot: Bot;
  BotID: number;
  URL: string;
  Title: string;
  Source: string;
  Published: number;
  Description: string;
}


