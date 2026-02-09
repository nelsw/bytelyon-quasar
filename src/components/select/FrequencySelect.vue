<script setup lang="ts">
import { computed } from 'vue';

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

const toOption = (n: number): Option => {
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

const props = defineProps<{
  color: string;
  hint: string;
}>();

const model = defineModel<number>({ required: true });

const options = computed(() => {
  const opts: Option[] = [once, hourly, daily, weekly];
  if (props.color === 'amber-13') {
    opts.unshift(never);
  }
  return opts;
});
</script>

<template>
  <q-select
    :model-value="toOption(model)"
    :color="color"
    :hint="hint"
    :options="options"
    label="Repeats"
    dense
    hide-dropdown-icon
    @update:modelValue="(o: Option) => (model = o.value)"
  >
    <template #prepend>
      <q-icon name="mdi-clock-outline" :color="color" />
    </template>
  </q-select>
</template>
