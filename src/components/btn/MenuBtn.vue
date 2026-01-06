<script setup lang="ts">
import { computed } from 'vue';
import XTooltip from 'components/tooltip/XTooltip.vue';
defineProps<{
  tooltip?: boolean;
}>()
const model = defineModel<boolean>();
const name = computed(() => (model.value ? 'mdi-menu-open' : 'mdi-menu-close'));
const text = computed(() => (model.value ? 'Collapse' : 'Expand'));
</script>

<template>
  <q-btn @click="model = !model" color="grey" dense flat size="md" :icon="name">
    <x-tooltip v-if="tooltip" anchor="top end" self="bottom middle" :offset="[10, 10]" :text="text" />
  </q-btn>
</template>
