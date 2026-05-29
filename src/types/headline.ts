import type { ULID } from 'ulid';

export type Headline = {
  id: ULID;
  title: string;
  url: string;
}
