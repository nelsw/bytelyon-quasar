import { type Sitemap } from 'src/types/sitemap';

export interface Sitemaps {
  id: string;
  url: string;
  domain: string;
  updated: number;
  duration: number;
  average: number;
  relative: number;
  remote: number;
  size: number;
  sitemaps: Sitemap[];
}
