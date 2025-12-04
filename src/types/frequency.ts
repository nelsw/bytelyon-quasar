import { Option, type OptionProps, type OptionsProps } from 'src/types/base';

const minuteOptions: OptionsProps = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
];

const hourOptions: OptionsProps = Array(11)
  .fill(0)
  .map((_, i): OptionProps => new Option(i));

const dayOptions: OptionsProps = Array(13)
  .fill(0)
  .map((_, i): OptionProps => new Option(i));

export const FrequencyValueOptions = (u?: Unit): Option[] => {
  if (u === Unit.MINUTE) {
    return minuteOptions;
  } else if (u === Unit.HOUR) {
    return hourOptions
  } else if (u === Unit.DAY) {
    return dayOptions
  } else {
    return []
  }
}

export interface Frequency {
  unit: Unit;
  value: number;
}

export const enum Unit {
  MINUTE = 'm',
  HOUR = 'h',
  DAY = 'd',
}

export const UnitOptions: OptionsProps = [
  { label: 'Minute', value: Unit.MINUTE },
  { label: 'Hour', value: Unit.HOUR },
  { label: 'Day', value: Unit.DAY },
];

const frequencyLabel = (f: Frequency): string => `${f.unit}${f.value}`;
const unitLabel = (f: Frequency): string => {
  switch (f.unit) {
    case Unit.DAY:
      return 'Day';
    case Unit.HOUR:
      return 'Hour';
    case Unit.MINUTE:
      return 'Minute';
  }
};
const unitOptions = (f: Frequency): OptionsProps => {
  switch (f.unit) {
    case Unit.DAY:
      return dayOptions;
    case Unit.HOUR:
      return hourOptions;
    case Unit.MINUTE:
      return minuteOptions;
  }
};
export { frequencyLabel, unitLabel, unitOptions };
