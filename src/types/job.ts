import type { Model } from 'src/types/model';

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
    CreatedAt: null,
    UpdatedAt: null,
    DeletedAt: null,
    Enabled: true,
    Type: t,
    Frequency: f,
    Target: tgt,
    BlackList: bl,
  };
};
