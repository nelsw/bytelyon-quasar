export interface Sitemap {
  domain: string;
  duration: number;
  end: string;
  id: string;
  relative: string[];
  remote: string[];
  start: string;
  url: string;
}

export interface Row extends Record<string, unknown> {
  url: string;
  backlink: boolean;
}
