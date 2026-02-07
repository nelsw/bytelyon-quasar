// values in nanoseconds (int64)
const hour = 3600000000000;
const day = hour * 24;
const week = hour * 24;

export interface Option {
  label: string;
  value: number;
}

const never: Option = { label: 'Never (Pause)', value: 0 };
const once: Option = { label: 'Once', value: 1 };
const hourly:Option = { label: 'Hourly', value: hour };
const daily: Option = { label: 'Daily', value: day };
const weekly: Option = { label: 'Weekly', value: week };

export const Options = (create?:boolean): Option[] => {
  if (create) {
    return [once, hourly, daily, weekly];
  } else {
    return [never, once, hourly, daily, weekly];
  }
}

export const DefaultOption: Option = hourly;

export const FromValue = (n:number): Option => {
  if (n === 0) {
    return never;
  } else if (n === 1) {
    return once;
  } else if (n < day) {
    return hourly;
  } else if (n < week) {
    return daily;
  } else {
    return weekly;
  }
};
