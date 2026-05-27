import { decodeTime, ulid, type ULID } from 'ulid';
import { date } from 'quasar';

export const age = (id: ULID): string => `${days(id)}d`;

export const days = (id: ULID) => date.getDateDiff(new Date(), decodeTime(id), 'days');

export const mins = (id: ULID): number => date.getDateDiff(decodeTime(id), new Date(), 'minutes');

export const less = (a: ULID, b: ULID): number => mins(a) - mins(b);

export const ts = (id: ULID): string => new Date(decodeTime(id)).toLocaleString();

export const now = () => ulid();

export const from = (s:string) => ulid(new Date(s).getTime())
