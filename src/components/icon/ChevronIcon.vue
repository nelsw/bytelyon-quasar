<script setup lang="ts">
defineProps<{
  expanded: boolean;
}>();
</script>

<template>
  <q-icon :name="`mdi-chevron-${expanded ? 'up' : 'down'}`" />
</template>
