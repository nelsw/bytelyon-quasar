<script setup lang="ts">
import { QInput } from 'quasar';
defineProps<{
  disabled?: boolean | undefined;
  placeholder?: string | undefined;
}>();
const model = defineModel<string>();
</script>

<template>
  <q-input
    ref="my-input"
    v-model="model"
    :disabled="disabled"
    color="primary"
    :placeholder="placeholder || 'Filter'"
    autofocus
    dense
    borderless
  >
    <template #prepend>
      <q-icon
        v-if="model?.length ?? 0 > 0"
        @click="model = ''"
        class="cursor-pointer"
        name="mdi-close"
      />
      <q-icon v-else name="mdi-filter-variant" color="primary" />
    </template>
  </q-input>
</template>
