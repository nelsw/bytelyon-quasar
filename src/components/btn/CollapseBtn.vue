<script setup lang="ts">
import { computed } from 'vue';
import XTooltip from 'components/tooltip/XTooltip.vue';

const props = defineProps<{
  side?: string | undefined;
}>();

const model = defineModel<boolean>();
const name = computed(() => {
  let truth = model.value;
  if (props.side === 'right') {
    truth = !truth;
  }
  return truth ? 'mdi-arrow-collapse-left' : 'mdi-arrow-collapse-right';
});
const text = computed(() => {
  let truth = model.value;
  if (props.side === 'right') {
    truth = !truth;
  }
  return truth ? 'Collapse' : 'Expand';
});
</script>

<template>
  <q-btn @click="model = !model" color="grey" dense flat size="sm" :icon="name">
    <x-tooltip anchor="top end" self="bottom middle" :offset="[10, 10]" :text="text" />
  </q-btn>
</template>
