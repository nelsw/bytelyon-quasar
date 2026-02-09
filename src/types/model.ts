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

export const BotTypes = [BotType.Search, BotType.Sitemap, BotType.News];

export const BotTypeIcon = (b: BotType): string => {
  switch (b) {
    case BotType.Search:
      return 'mdi-web';
    case BotType.Sitemap:
      return 'mdi-sitemap';
    case BotType.News:
      return 'mdi-newspaper';
  }
};

// export interface BotData extends Model {
//   Bot: Bot;
// }

export interface Search extends Model {
  Bot: Bot;
  BotID: number;
  Pages: Page[];
}

export interface Page extends Model {
  URL: string;
  Title: string;
  IMG: string;
  HTML: string;
  JSON: unknown;
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

export const NewBot = <T = BotType>(t:T): Bot<T> => {
  return {
    ID: 0,
    CreatedAt: 0,
    UpdatedAt: 0,
    DeletedAt: null,
    Type: t,
    Frequency: 1,
    Target: '',
    BlackList: [],
  };
};
