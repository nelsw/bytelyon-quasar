<script setup lang="ts">
interface Option {
  label: string;
  value: number;
}

defineProps<{
  color: string;
  hint?: boolean | undefined;
  icon?: boolean | undefined;
  label?: boolean | undefined;
}>();

// values in nanoseconds (int64)
const hour = 3600000000000;
const day = hour * 24;
const week = day * 7;

const never: Option = { label: 'Never (Paused)', value: 0 };
const once: Option = { label: 'Once (Now)', value: 1 };
const hourly: Option = { label: 'Hourly', value: hour };
const daily: Option = { label: 'Daily', value: day };
const weekly: Option = { label: 'Weekly', value: week };

const model = defineModel<number>({ required: true });
</script>

<template>
  <q-select
    :model-value="
      model === 0
        ? never
        : model < hour
          ? once
          : model < day
            ? hourly
            : model < week
              ? daily
              : weekly
    "
    :color="color"
    :options="
      color === 'green-13' ? [once, hourly, daily, weekly] : [never, once, hourly, daily, weekly]
    "
    :label="label ? `Repeats` : undefined"
    hide-dropdown-icon
    :hint="hint ? `Run on a schedule or 'On-Demand' (once & pause).` : undefined"
    @update:modelValue="(o: Option) => (model = o.value)"
    dense

    hide-bottom-space
    filled
    options-dense
    square
  >
    <template #prepend>
      <q-icon name="mdi-calendar-sync-outline" :color="color" />
    </template>
  </q-select>
</template>

