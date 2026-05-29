const never = 0;
const nano = 1;
const micro = nano * 1000;
const milli = micro * 1000;
const second = milli * 1000;
const minute = second * 1000;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;

type Option = {
  label: string;
  value: number;
};

export const Options = (create?: boolean): Option[] => {
  const o: Option[] = [
    { label: 'Never (Paused)', value: never },
    { label: 'Once (Now)', value: nano },
    { label: 'Hourly', value: hour },
    { label: 'Daily', value: day },
    { label: 'Weekly', value: week },
  ];

  if (create) {
    o.splice(0, 1);
  }

  return o;
};
