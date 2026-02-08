export interface Model {
  ID: number;
  CreatedAt: number;
  UpdatedAt: number;
  DeletedAt: number | null;
}

export type Bots = Bot[];

export interface Bot extends Model {
  Type: BotType;
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

export interface Search extends Model {
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
  BotID: number;
  URL: string;
  Domain: string;
  Relative: string[];
  Remote: string[];
}

export interface News extends Model {
  BotID: number;
  URL: string;
  Title: string;
  Source: string;
  Published: number;
}

export const NewBot = (t: BotType, s: string, ss: string[], n: number): Bot => {
  return {
    ID: 0,
    CreatedAt: 0,
    UpdatedAt: 0,
    DeletedAt: null,
    Type: t,
    Frequency: n,
    Target: s,
    BlackList: ss,
  };
};
