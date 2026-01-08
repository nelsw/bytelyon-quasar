<script setup lang="ts">
import { QInput } from 'quasar';

const model = defineModel<string>({ required: true });
</script>

<template>
  <q-input
    ref="input"
    v-model="model"
    dense
    borderless
    dark
    square
    hide-bottom-space
    placeholder="Filter"
  >
    <template #prepend>
      <q-icon v-if="model.length === 0" name="mdi-filter-variant" color="grey" size="xs" />
      <q-btn v-else dense size="xs" @click="model = ''" flat>
        <q-icon name="mdi-close" color="grey" size="xs" />
      </q-btn>
    </template>
  </q-input>
</template>
