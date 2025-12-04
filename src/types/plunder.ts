import { type Loot } from 'src/types/loot';

export interface Plunder {
  id: string;
  target: string;
  follow: string[];
  loot: Loot[];
}
