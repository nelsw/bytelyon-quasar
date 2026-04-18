<script setup lang="ts">
import type { Bot } from 'src/types/model';

interface Option {
  label: string;
  value: number;
}

// values in nanoseconds (int64)
const hour = 3600000000000;
const day = hour * 24;
const week = day * 7;

const never: Option = { label: 'Never (Paused)', value: 0 };
const once: Option = { label: 'Once (Now)', value: 1 };
const hourly: Option = { label: 'Hourly', value: hour };
const daily: Option = { label: 'Daily', value: day };
const weekly: Option = { label: 'Weekly', value: week };

const model = defineModel<Bot>({ required: true });
</script>

<template>
  <q-select
    :model-value="
      model.frequency === 0
        ? never
        : model.frequency < hour
          ? once
          : model.frequency < day
            ? hourly
            : model.frequency < week
              ? daily
              : weekly
    "
    :color="model.id === '' ? 'green-13' : 'amber-13'"
    :options="
      model.id === '' ? [once, hourly, daily, weekly] : [never, once, hourly, daily, weekly]
    "
    label="Repeats"
    hide-dropdown-icon
    hint="Run on a schedule or 'On-Demand' (once & pause)."
    @update:modelValue="(o: Option) => (model.frequency = o.value)"
  >
    <template #prepend>
      <q-icon name="mdi-clock-outline" :color="model.id === '' ? 'green-13' : 'amber-13'" />
    </template>
  </q-select>
</template>
