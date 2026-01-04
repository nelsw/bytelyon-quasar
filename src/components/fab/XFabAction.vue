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
    label-position="left"
    label-class="bg-grey-3 text-black"
  />
</template>
