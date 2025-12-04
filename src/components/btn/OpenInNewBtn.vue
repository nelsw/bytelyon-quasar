<script setup lang="ts">
defineProps<{
  url: string;
}>()
</script>

<template>
  <q-btn dense flat target="_blank" :href="url" no-caps size="sm">
    <q-icon name="mdi-open-in-new" color="primary" size="xs" />
    <q-tooltip class="bg">Open in new tab</q-tooltip>
  </q-btn>
</template>
