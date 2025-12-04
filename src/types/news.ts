import { type Article } from 'src/types/article';

export interface News {
  id: string;
  name: string;
  keywords: string[];
  articles?: Article[];
}
