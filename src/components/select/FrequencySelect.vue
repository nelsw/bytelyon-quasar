<script setup lang="ts">
defineProps<{
  create?: boolean;
  hint?: boolean | undefined;
  label?: boolean | undefined;
}>();

const never = { label: 'Never (Paused)', value: -1 };
const once = { label: 'Once (Now)', value: 0 };
const hourly = { label: 'Hourly', value: 1 };
const daily = { label: 'Daily', value: 24 };
const weekly = { label: 'Weekly', value: 7 * 24 };

const model = defineModel<number>({ required: true });
</script>

<template>
  <q-select
    @update:modelValue="(o) => (model = o.value)"
    :model-value="
      model === -1
        ? never
        : model === 0
          ? once
          : model === 1
            ? hourly
            : model === 24
              ? daily
              : weekly
    "
    :color="create ? 'green-13' : 'amber-13'"
    :hint="hint ? `Run on a schedule or 'On-Demand' (once & pause).` : undefined"
    :label="label ? `Repeats` : undefined"
    :options="create ? [once, hourly, daily, weekly] : [never, once, hourly, daily, weekly]"
    dense
    filled
    hide-bottom-space
    hide-dropdown-icon
  >
    <template #prepend>
      <q-icon name="mdi-calendar-sync-outline" :color="(create ?? false) ? 'green-13' : 'amber-13'" />
    </template>
  </q-select>
</template>
