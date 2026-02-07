export interface Model {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
}

export interface Article {
  JobID: number;
  URL: string;
  Title: string;
  Source: string;
  Published: number;
}

export interface Search extends Model {
  JobID: number;
  Pages: Page[];
}

export interface Page extends Model {
  URL: string;
  Title: string;
  IMG: string;
  HTML: string;
  JSON: unknown;
}

export const enum JobType {
  SEARCH = 'search',
  SITEMAP = 'sitemap',
  ARTICLE = 'article',
}

export interface Job extends Model {
  Enabled: boolean;
  Type: JobType;
  Frequency: number;
  Target: string;
  BlackList: string[];
}

export const NewJob = (t: JobType, tgt: string, bl: string[], f: number): Job => {
  return {
    ID: 0,
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
    DeletedAt: new Date(),
    Enabled: true,
    Type: t,
    Frequency: f,
    Target: tgt,
    BlackList: bl,
  };
};

export interface Sitemap extends Model {
  JobID: number;
  URL: string;
  Domain: string;
  Relative: string[];
  Remote: string[];
}

export interface Row extends Record<string, unknown> {
  url: string;
  backlink: boolean;
}
