<script setup lang="ts">
import { Options } from 'src/types/duration';

defineProps<{
  create?: boolean;
  hint?: boolean | undefined;
  label?: boolean | undefined;
}>();

const model = defineModel<number>({ required: true });
</script>

<template>
  <q-select
    v-model="model"
    :color="create ? 'green-13' : 'amber-13'"
    :hint="hint ? `Run on a schedule or 'On-Demand' (once & pause).` : undefined"
    :label="label ? `Repeats` : undefined"
    :options="Options(create)"
    dense
    filled
    hide-bottom-space
    hide-dropdown-icon
    emit-value
    map-options
  >
    <template #prepend>
      <q-icon
        name="mdi-calendar-sync-outline"
        :color="(create ?? false) ? 'green-13' : 'amber-13'"
      />
    </template>
  </q-select>
</template>
