<script setup lang="ts">
import { Options, type Option } from 'src/types/frequency';

defineProps<{
  color: string;
  hint: string;
}>();

const model = defineModel<Option>();
</script>

<template>
  <q-select
    v-model="model"
    :color="color"
    :hint="hint"
    :options="Options"
    label="Frequency"
    dense
  >
    <template #prepend>
      <q-icon name="mdi-clock-outline" :color="color" />
    </template>
  </q-select>
</template>
