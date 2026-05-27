import type { ULID } from 'ulid';

export interface Headline {
  id: ULID;
  title: string;
  url: string;
}
