<script setup lang="ts">
defineProps<{
  color: string;
  icon: string;
  label: string;
}>();
</script>

<template>
  <q-fab-action
    square
    external-label
    :color="color"
    :icon="icon"
    :label="label"
    text-color="grey-10"
    label-position="left"
    :label-class="`bg-grey-10 text-${color}`"
  />
</template>
