export interface Model {
  ID: number;
  CreatedAt: number;
  UpdatedAt: number;
  DeletedAt: number | null;
}

export interface Article extends Model {
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
  Type: JobType;
  Frequency: number;
  Target: string;
  BlackList: string[];
}

export const NewJob = (t: JobType, s: string, ss: string[], n: number): Job => {
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

export interface Sitemap extends Model {
  JobID: number;
  URL: string;
  Domain: string;
  Relative: string[];
  Remote: string[];
}
