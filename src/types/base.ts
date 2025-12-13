export interface OptionProps {
  readonly label: string;
  readonly value: string | number;
}

export class Option implements OptionProps {
  readonly label: string;
  readonly value: string | number;
  constructor(value: string | number) {
    this.label = typeof value === 'string' ? value : value.toString();
    this.value = value;
  }
}

export type OptionsProps = Array<OptionProps>;

export const clone = <T>(t: T): T => JSON.parse(JSON.stringify(t));

export const capitalize = (text: string) =>
  text.replace(/\w\S*/g, (s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase());

export const truncateString = (s: string, l: number) =>
  s.length > l ? s.slice(0, l - 3) + '...' : s;

