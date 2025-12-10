import { type Page } from 'src/types/page';
import { type Targets } from 'src/types/targets';

export interface Search {
  id: string;
  query: string;
  targets: Targets;
  pages: Page[];
}
