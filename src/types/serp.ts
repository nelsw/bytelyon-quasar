export interface Serp {
  sponsored: Item[];
  organic: Item[];
  forum: Item[];
  video: Item[];
  article: Item[];
  people_also_ask: Item[];
  people_also_search_for: Item[];
}

export interface Item {
  link: string;
  position: number;
  snippet: string;
  source: string;
  title: string;
}
