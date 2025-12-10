<script setup lang="ts">
import XTooltip from 'components/tooltip/XTooltip.vue';

defineProps<{
  fullscreen: boolean;
  color?: string;
}>();
</script>

<template>
  <q-btn
    :icon="`mdi-fullscreen${fullscreen ? '-exit' : ''}`"
    :color="`${color ?? 'blue-grey-5'}`"
    dense
    flat
  >
    <x-tooltip :text="`${fullscreen ? 'Exit' : 'Enter'}<br>Fullscreen`" />
  </q-btn>
</template>
