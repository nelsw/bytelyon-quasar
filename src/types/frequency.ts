import { Option, type OptionProps, type OptionsProps } from 'src/types/base';

const MinuteOptions: OptionsProps = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
];

const HourOptions: OptionsProps = Array(11)
  .fill(0)
  .map((_, i): OptionProps => new Option(i));

const DayOptions: OptionsProps = Array(13)
  .fill(0)
  .map((_, i): OptionProps => new Option(i));

export const FrequencyValueOptions = (u?: Unit): Option[] => {
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

export const UnitOptions: OptionsProps = [
  { label: 'Minute', value: Unit.MINUTE },
  { label: 'Hour', value: Unit.HOUR },
  { label: 'Day', value: Unit.DAY },
];

