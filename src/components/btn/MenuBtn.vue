<script setup lang="ts">
defineProps<{
  icon: string;
}>()
</script>

<template>
  <q-btn flat dense :icon="icon">
    <q-menu>
      <slot/>
    </q-menu>
  </q-btn>
</template>
