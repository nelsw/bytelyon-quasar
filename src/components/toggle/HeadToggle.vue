<script setup lang="ts">
import { computed } from 'vue';

defineProps<{
  color: string;
  label?: boolean | undefined;
  tooltip?: boolean | undefined;
}>();
const model = defineModel<boolean | undefined>();
const hint = computed(() =>
  model.value === undefined
    ? 'Undefined Browser Type'
    : model.value
      ? 'Headless Browser (Quiet)'
      : 'Headful Browser (Performant)',
);
</script>

<template>
  <q-toggle
    v-model="model"
    :indeterminate-value="undefined"
    indeterminate-icon="mdi-ghost-off-outline"
    checked-icon="mdi-ghost-outline"
    unchecked-icon="mdi-ghost"
    keep-color
    :color="color ?? 'primary'"
    :label="label ? hint : undefined"
    icon-color="dark"
  >
    <slot />
    <q-tooltip v-if="tooltip">
      {{ hint }}
    </q-tooltip>
  </q-toggle>
</template>
