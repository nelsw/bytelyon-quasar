<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

interface Option {
  label: string;
  value: number;
}

// values in nanoseconds (int64)
const hour = 3600000000000;
const day = hour * 24;
const week = day * 7;

const never: Option = { label: 'Never (Pause)', value: 0 };
const once: Option = { label: 'Once', value: 1 };
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
const option = ref<Option>({ label: 'Hourly', value: hour });

const options = computed(() => {
  const opts: Option[] = [once, hourly, daily, weekly];
  if (props.color === 'green-13') {
    opts.unshift(never);
  }
  return opts;
});

onMounted(() => {
  if (props.color !== 'green-13') {
    option.value = toOption(model.value);
  }
});

watch(option, () => (model.value = option.value.value));
</script>

<template>
  <q-select v-model="option" :color="color" :hint="hint" :options="options" label="Repeats" dense>
    <template #prepend>
      <q-icon name="mdi-clock-outline" :color="color" />
    </template>
  </q-select>
</template>
