export interface Results {
  organic?: Result[],
  sponsored?: Result[],
  videos?: Result[],
  forums?: Result[],
  articles?: Result[],
}

export interface Result {
  position: number;
  title: string;
  link: string;
  source: string;
  snippet: string;
  price?: number;
}

export interface Loot {
  id: string;
  idx: string;
  name: string;
  data: Results;
  html: string;
  image: string;
}
