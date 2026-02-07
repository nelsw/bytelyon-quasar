<script setup lang="ts">
import { Options, type Option } from 'src/types/dto';

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
    :options="Options(color === 'green-13')"
    label="Repeats"
    dense
  >
    <template #prepend>
      <q-icon name="mdi-clock-outline" :color="color" />
    </template>
  </q-select>
</template>
