<script setup lang="ts">
import type { Option } from 'src/types/base';
import { onMounted, ref } from 'vue';

defineProps<{
  color: string;
}>();

const nano = 1;
const micro = nano * 1_000;
const milli = micro * 1_000;
const second = milli * 1_000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

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
    return { label: i.toString(), value: i };
  });

const DayOptions: Option[] = Array(13)
  .fill(0)
  .map((_, i): Option => {
    return { label: i.toString(), value: i };
  });

const FrequencyOptions = (u?: Unit): Option[] => {
  if (u === Unit.MINUTE) {
    return MinuteOptions;
  } else if (u === Unit.HOUR) {
    return HourOptions;
  } else if (u === Unit.DAY) {
    return DayOptions;
  } else {
    return [];
  }
};

interface Frequency {
  unit: Unit;
  qty: number;
}

const enum Unit {
  MINUTE = 'm',
  HOUR = 'h',
  DAY = 'd',
}

const duration = (u: Unit): number => {
  switch (u) {
    case Unit.MINUTE:
      return minute;
    case Unit.HOUR:
      return hour;
    case Unit.DAY:
      return day;
    default:
      return 0;
  }
};

const UnitOptions: Option[] = [
  { label: 'Minutes', value: Unit.MINUTE },
  { label: 'Hour', value: Unit.HOUR },
  { label: 'Day', value: Unit.DAY },
];

const model = defineModel<number>({ required: true });

const proxy = ref<Frequency>({
  unit: Unit.MINUTE,
  qty: 15,
});

const onChange = (o:object) => {
  console.debug('onChange', JSON.stringify(o, null, 2));
  model.value = duration(proxy.value.unit) * proxy.value.qty;
  console.log('watch',duration(proxy.value.unit), proxy.value.qty, duration(proxy.value.unit) * proxy.value.qty, model.value);
};

onMounted(() => {
  console.log('mounted', model.value);
  let v: number = model.value;

  if (v === 0) {
    v = 15 * minute;
  }

  if (v >= day) {
    proxy.value.unit = Unit.DAY;
    proxy.value.qty = v / day;
  } else if (v >= hour) {
    proxy.value.unit = Unit.HOUR;
    proxy.value.qty = v / hour;
  } else {
    proxy.value.unit = Unit.MINUTE;
    proxy.value.qty = v / minute;
  }
});
</script>

<template>
  <div class="flex justify-start items-center q-gutter-sm">
    <q-icon class="q-mr-sm" name="mdi-clock" size="sm" :color="color" />
    <q-select
      v-model="proxy.qty"
      label="Repeat"
      name="value"
      :color="color"
      map-options
      hide-dropdown-icon
      emit-value
      :options="FrequencyOptions(proxy.unit)"
      style="width: 45px"
      @update:model-value="onChange"
    />
    <q-select
      v-model="proxy.unit"
      label="Every"
      name="unit"
      :color="color"
      map-options
      emit-value
      :options="UnitOptions"
      hide-dropdown-icon
      style="width: 60px"
      @update:model-value="onChange"
    />
  </div>
</template>
