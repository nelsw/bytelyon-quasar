
export const enum JobType {
  NEWS = 'news',
  SEARCH = 'search',
  SITEMAP = 'sitemap',
}

export interface Job {
  id: string;
  name: string;
  type: JobType;
  frequency: unknown;
  results: JobResults;
}

export type JobResults = Map<string, string>


