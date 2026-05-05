import type { DateInput } from 'quasar';
import { date } from 'quasar';

export const domain = (url: string) => {
  if (url.startsWith('https://')) {
    url = url.substring(8);
  }
  if (url.startsWith('www.')) {
    url = url.substring(4);
  }
  const slash = url.indexOf('/');
  if (slash < 0) {
    return url;
  }
  url = url.substring(0, slash);
  return url;
};

export const path = (url: string) => {
  if (url.startsWith('https://')) {
    url = url.substring(8);
  }
  if (url.startsWith('www.')) {
    url = url.substring(4);
  }
  const slash = url.indexOf('/');
  if (slash < 0) {
    return url;
  }
  const query = url.indexOf('?');
  if (query < 0) {
    return url.substring(slash);
  }
  return url.substring(slash, query);
};

export const base64 = (s: string) =>
  btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');


export const Minutes = (then: DateInput): number => date.getDateDiff(then, new Date(), 'minutes');

export const Days = (then: DateInput): number => date.getDateDiff(new Date(), then, 'days');

export const Sleep = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

export const Money = (n: number): string => {
  let s = n.toString();
  if (!s.includes('.')) {
    s += '.00';
  }
  if (n >= 100000) {
    s = s.slice(0, 3) + ',' + s.slice(3);
  } else if (n >= 10000) {
    s = s.slice(0, 2) + ',' + s.slice(2);
  } else if (n >= 1000) {
    s = s.slice(0, 1) + ',' + s.slice(1);
  }
  return '$' + s;
};

export const Phone = (s:string): string => {
  let p = s.trim()
  if (p.length === 0) return '';

  p = p.replaceAll(/[+()\s\\-]/g, '');
  if (p.length === 10) {
    p = '1' + p;
  }
  return `+${p.charAt(0)} (${p.slice(1, 4)}) ${p.slice(4, 7)}-${p.slice(7)}`;
}

export const At = (s: string | Date | number): string => date.formatDate(s, 'YYYY-MM-DD HH:mm');
