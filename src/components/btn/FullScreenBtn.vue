<script setup lang="ts">
defineProps<{
  fullscreen: boolean;
}>()
</script>

<template>
  <q-btn
    flat
    dense
    :icon="fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"

  />
</template>

<style scoped lang="scss"></style>
