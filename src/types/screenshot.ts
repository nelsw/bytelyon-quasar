import { v5 as uuidv5 } from 'uuid';

export const screenshot = (url?: string, id?: string): string => {
  if (!url || !id) return '';
  return `https://bytelyon-public.s3.amazonaws.com/pages/${uuidv5(url, uuidv5.URL)}/${id}/screenshot.png`;
}
