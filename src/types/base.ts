export const capitalize = (text: string) =>
  text.replace(/\w\S*/g, (s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase());

export const truncateString = (s: string, l: number) =>
  s.length > l ? s.slice(0, l - 3) + '...' : s;

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

export const SearchColor: string = 'indigo-14';
