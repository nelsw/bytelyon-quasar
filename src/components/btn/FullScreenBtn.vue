<script setup lang="ts">

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
  />
</template>
