// values in nanoseconds (int64)
export const hour = 3600000000000;
export const day = hour * 24;
export const week = hour * 24;

export interface Option {
  label: string;
  value: number;
}

export const Options: Option[] = [
  { label: 'Once', value: 0 },
  { label: 'Hourly', value: hour },
  { label: 'Daily', value: day },
  { label: 'Weekly', value: week },
];

export const DefaultOption:Option = Options[2] as Option;
