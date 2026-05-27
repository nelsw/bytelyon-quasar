import { type ULID } from 'ulid';
import { type Image } from 'src/types/image';

export interface Article {
  body: string[];
  description: string;
  id: ULID;
  image: Image;
  keywords: string[];
  source: string;
  title: string;
  url: string;
}

