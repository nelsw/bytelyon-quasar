<script setup lang="ts">
import { QInput } from 'quasar';
const model = defineModel<string>()
</script>

<template>
  <q-input
    ref="my-input"
    class="q-pt-md q-px-md"
    v-model="model"
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
