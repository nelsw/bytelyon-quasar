import { domain } from 'src/types/base';
import { format, type QTableColumn, uid } from 'quasar';
import capitalize = format.capitalize;

export type Serp = {
  sponsored: Item[] | null;
  organic: Item[] | null;
  forum: Item[] | null;
  video: Item[] | null;
  article: Item[] | null;
  people_also_ask: Item[] | null;
  people_also_search_for: Item[] | null;
};

export type Item = {
  link: string;
  position: number;
  snippet: string;
  source: string;
  title: string;
};

export type Row = {
  uid: string;
  description: string;
  rank: number;
  section: string;
  source: string;
  title: string;
  url: string;
};

export const Rows = (serp?: Serp): Row[] => {
  if (!serp) return [];
  const rows: Row[] = [];

  let maxTitleLen = 0;
  for (const key of Object.keys(serp) as Array<keyof Serp>) {
    if (serp[key] === null) continue;
    let rank = 1;
    for (const item of serp[key]) {
      let section: string = key;
      if (section === 'article') {
        section = 'Trending';
      } else if (section === 'people_also_ask') {
        section = 'Also Asked';
      } else if (section === 'people_also_search_for') {
        section = 'Also Searched';
      } else {
        section = capitalize(section);
      }

      let source = item.source;
      if (!source || source.includes('error') || key === 'forum') {
        source = domain(item.link);
      }
      if (source.includes('error')) {
        source = domain(item.title);
      }

      let title = item.title;
      if (section === 'Sponsored' && title.length > maxTitleLen) {
        maxTitleLen = title.length;
      }

      if (section !== 'Sponsored' && maxTitleLen > 0 && title.length > maxTitleLen) {
        title = title.substring(0, maxTitleLen - 3) + '...';
      }

      rows.push({
        uid: uid(),
        description: item.snippet,
        rank,
        section,
        source,
        title,
        url: item.link,
      });

      rank += 1;
    }
  }
  return rows;
};

export const Color = (section: string): string => {
  switch (section.toLowerCase()) {
    case 'sponsored':
      return 'green-14';
    case 'organic':
      return 'blue-8';
    case 'video':
      return 'red-6';
    case 'article':
    case 'trending':
      return 'purple-12';
    case 'forum':
      return 'orange';
    case 'people_also_ask':
    case 'also asked':
      return 'teal-6';
    case 'people_also_search_for':
    case 'also searched':
      return 'teal-4';
  }
  return 'primary';
};

export const SectionSort = (a: string, b: string): number => sectionNumber(a) - sectionNumber(b);

const sectionNumber = (s: string): number => {
  switch (s.toLowerCase()) {
    case 'sponsored':
      return 0;
    case 'organic':
      return 1;
    case 'video':
      return 2;
    case 'article':
    case 'trending':
      return 3;
    case 'forum':
      return 4;
    case 'people_also_ask':
    case 'also asked':
      return 5;
    case 'people_also_search_for':
    case 'also searched':
      return 6;
  }
  return 999;
};

export const Columns: QTableColumn<Row>[] = [
  {
    name: 'Section',
    label: 'Section',
    field: 'section',

    sortable: false,
    sort: SectionSort,
    style: 'width: 0;',
  },
  {
    name: 'Rank',
    label: 'Rank',
    field: 'rank',
    align: 'center',
    style: 'width: 0;',
    sortable: false,
    sort: (a: number, b: number) => a - b,
  },

  { name: 'Source', label: 'Source', field: 'source', align: 'left' },
  { name: 'Title', label: 'Title', field: 'title', align: 'left' },
  {
    name: 'Description',
    label: 'Description',
    field: 'description',
    align: 'left',
  },
  { name: 'View', label: 'View', field: 'url', align: 'center', style: 'width: 0;' },
  { name: 'Visit', label: 'Visit', field: 'url', align: 'center', style: 'width: 0;' },
];
