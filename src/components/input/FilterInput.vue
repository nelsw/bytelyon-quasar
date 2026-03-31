<script setup lang="ts">
import { QInput } from 'quasar';
defineProps<{
  disabled?: boolean | undefined;
}>()
const model = defineModel<string>()
</script>

<template>
  <q-input
    ref="my-input"
    v-model="model"
    :disabled="disabled"
    color="primary"
    placeholder="Filter"
    autofocus
    clearable
    clear-icon="mdi-close"
    dense
    borderless
  >
    <template #prepend>
      <q-icon name="mdi-filter-variant" color="primary" />
    </template>
  </q-input>
</template>
