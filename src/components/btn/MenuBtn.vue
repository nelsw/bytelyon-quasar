<script setup lang="ts">
import { computed } from 'vue';
import XTooltip from 'components/tooltip/XTooltip.vue';
const props = defineProps<{
  tooltip?: boolean;
  reverse?: boolean;
}>();
const model = defineModel<boolean>();
const name = computed(() =>
  (model.value && !props.reverse) || (!model.value && props.reverse) ? 'open' : 'close',
);
const text = computed(() =>
  (model.value && !props.reverse) || (!model.value && props.reverse) ? 'Collapse' : 'Expand',
);
</script>

<template>
  <q-btn @click="model = !model" color="grey" dense flat size="md" :icon="`mdi-menu-${name}`">
    <x-tooltip
      v-if="tooltip"
      anchor="top end"
      self="bottom middle"
      :offset="[10, 10]"
      :text="text"
    />
  </q-btn>
</template>
