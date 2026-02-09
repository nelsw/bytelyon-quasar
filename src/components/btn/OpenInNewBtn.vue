<script setup lang="ts">

defineProps<{
  url: string;
  color?: string | undefined;
}>();
</script>

<template>
  <q-btn  flat target="_blank" :href="url" no-caps size="sm">
    <q-icon name="mdi-open-in-new" color="primary" size="xs" />
<!--    <x-tooltip text="Open in<br>new tab" />-->
  </q-btn>
</template>
