import { type QTableColumn } from 'quasar';
import { domain } from 'src/types/base';
import { capitalize } from 'vue';

export type Serp = Item[];
export type Item = {
  section: string;
  link: string;
  position: number;
  snippet: string;
  source: string;
  title: string;
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

export const Source = (s: string, i: Item) => s || domain(i.link);
export const Section = (s:string) => {
  if (s === 'people_also_ask') {
    return 'Also Asked'
  }
  if (s === 'people_also_search_for') {
    return 'Also Searched';
  }
  const arr = s.split('_');
  for (let j = 0; j < arr.length; j++) {
    arr[j] = capitalize(arr[j] as string);
  }
  return arr.join(' ');
};
export const Columns: QTableColumn<Item>[] = [
  { name: 'Section', label: 'Section', field: 'section', style: 'width: 0;', format: Section },
  { name: 'Rank', label: 'Rank', field: 'position', align: 'center', style: 'width: 0;' },
  { name: 'Source', label: 'Source', field: 'source', align: 'left', format: Source },
  { name: 'Title', label: 'Title', field: 'title', align: 'left' },
  { name: 'Link', label: 'Title', field: 'link', align: 'left' },
  { name: 'Description', label: 'Description', field: 'snippet', align: 'left' },
  { name: 'View', label: 'View', field: 'link', align: 'center', style: 'width: 0;' },
  { name: 'Visit', label: 'Visit', field: 'link', align: 'center', style: 'width: 0;' },
];



