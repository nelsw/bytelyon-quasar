export const capitalize = (text: string) =>
  text.replace(/\w\S*/g, (s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase());

export const truncateString = (s: string, l: number) =>
  s.length > l ? s.slice(0, l - 3) + '...' : s;

export const domain = (url: string) => {
  if (url.startsWith('https://')) {
    url = url.substring(8);
  }
  return url;
};

export const SearchColor: string = 'indigo-14';
