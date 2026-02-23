<script setup lang="ts">
defineProps<{
  fullscreen: boolean;
  color?: string;
}>();
</script>

<template>
  <q-btn :icon="`mdi-fullscreen${fullscreen ? '-exit' : ''}`" text-color="primary" dense flat />
</template>
