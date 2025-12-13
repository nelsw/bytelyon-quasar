import { type Results } from 'src/types/results';

export interface Page {
  id: string;
  url: string;
  title: string;
  content: string;
  screenshot: string;
  results?: Results | null;
}
