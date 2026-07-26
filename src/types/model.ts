import { type Image } from 'src/types/image';

export interface Customer {
  id: string;
  name: string;
  city: string;
  state: string;
  email: string;
  tags: string[];
  orders: number;
  phone: string;
  spent: number;
}

export interface Order {
  id: string;
  price: number;
  refunded: number;
  shipping: number;
  discounts: number;
  createdAt: Date;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export interface Post {
  backlink?: string | undefined;
  body: string;
  image: Image;
  keywords: string[];
  publishedAt: string;
  summary: string;
  tags: string[];
  title: string;
}

export class BlogPost implements Post {
  id: string;
  title: string;
  body: string;
  summary: string;
  tags: string[];
  image: Image;
  publishedAt: string;
  backlink?: string | undefined;
  keywords: string[];

  constructor() {
    this.id = '';
    this.title = '';
    this.body = '';
    this.summary = '';
    this.tags = [];
    this.image = {
      url: '',
      altText: '',
    };
    this.publishedAt = '';
    this.backlink = '';
    this.keywords = [];
  }
}
