import { type Frequency, Unit, unitLabel } from 'src/types/frequency';
import { type ItemProps } from 'src/types/item';

export const enum JobType {
  NEWS = 'news',
  SEARCH = 'search',
  SITEMAP = 'sitemap',
}

export interface Jerb {
  id: string;
  name: string;
  type: JobType;
  frequency: Frequency;
  results: JobResults;
}

export type JobResults = Map<string, string>

export interface JobProps {
  description: string;
  frequency: Frequency;
  id: string;
  keywords: string[];
  name: string;
  type: number;
  urls: string[];
  worked_at: string;
  worked_ok: boolean;
  items: ItemProps[];
}

export class Job implements JobProps {
  description: string;
  frequency: Frequency;
  id: string;
  keywords: string[];
  name: string;
  type: number;
  urls: string[];
  worked_at: string;
  worked_ok: boolean;
  items: ItemProps[];

  constructor(props?: JobProps) {
    this.description = props?.description ?? '';
    this.frequency = props?.frequency ?? { unit: Unit.DAY, value: 1 };
    this.id = props?.id ?? '';
    this.keywords = props?.keywords ?? [];
    this.name = props?.name ?? '';
    this.type = props?.type ?? 1;
    this.urls = props?.urls ?? [];
    this.worked_at = props?.worked_at ?? '';
    this.worked_ok = props?.worked_ok ?? true;
    this.items = props?.items ?? [];
  }

  computedName(): string {
    return `${this.keywords.join(', ')}@${this.frequency.unit}${this.frequency.value}`;
  }

  computedDesc(): string {
    const k = (this.keywords?.length > 0 ? this.keywords : ['<KEYWORDS>']).join(', ');
    const n = this.frequency.value;
    const p = n > 0;
    const u = unitLabel(this.frequency);
    return `Find news for ${k}, ${p ? 'every' : 'each'} ${n} ${u}${p ? 's.' : '.'}`;
  }

  computeName(ƒ: boolean | (() => boolean)): void {
    if (ƒ instanceof Function ? ƒ.call(this) : ƒ) {
      this.name = this.computedName();
    }
  }

  computeDesc(ƒ: boolean | (() => boolean)): void {
    if (ƒ instanceof Function ? ƒ.call(this) : ƒ) {
      this.description = this.computedDesc();
    }
  }
}
