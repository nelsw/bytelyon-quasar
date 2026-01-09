import { type Option } from 'src/types/base';

const MinuteOptions: Option[] = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
];

const HourOptions: Option[] = Array(11)
  .fill(0)
  .map((_, i): Option => {
    return { label: i.toString(), value: i }
  });

const DayOptions: Option[] = Array(13)
  .fill(0)
  .map((_, i): Option => {
    return { label: i.toString(), value: i };
  });

export const FrequencyOptions = (u?: Unit): Option[] => {
  if (u === Unit.MINUTE) {
    return MinuteOptions;
  } else if (u === Unit.HOUR) {
    return HourOptions
  } else if (u === Unit.DAY) {
    return DayOptions
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

export const UnitOptions: Option[] = [
  { label: 'Minute', value: Unit.MINUTE },
  { label: 'Hour', value: Unit.HOUR },
  { label: 'Day', value: Unit.DAY },
];

