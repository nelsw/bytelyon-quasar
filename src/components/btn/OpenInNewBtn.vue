<script setup lang="ts">
import XTooltip from 'components/tooltip/XTooltip.vue';

defineProps<{
  url: string;
  color?: string | undefined;
}>();
</script>

<template>
  <q-btn dense flat target="_blank" :href="url" no-caps size="sm">
    <q-icon name="mdi-open-in-new" color="primary" size="xs" />
    <x-tooltip text="Open in<br>new tab" />
  </q-btn>
</template>
