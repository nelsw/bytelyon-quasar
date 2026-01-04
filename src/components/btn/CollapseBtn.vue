<script setup lang="ts">
import { computed } from 'vue';
import XTooltip from 'components/tooltip/XTooltip.vue';

const model = defineModel<boolean>();
const name = computed(() => (model.value ? 'mdi-arrow-collapse-left' : 'mdi-arrow-collapse-right'));
const text =computed(() => (model.value ? 'Collapse' : 'Expand'));
</script>

<template>
  <q-btn @click="model = !model" color="grey" dense flat size="sm" :icon="name">
    <x-tooltip anchor="top end" self="bottom middle" :offset="[10, 10]" :text="text" />
  </q-btn>
</template>
