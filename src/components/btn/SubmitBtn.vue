<script setup lang="ts">
defineProps<{
  color: string;
  fullwidth?: boolean | undefined;
}>();
</script>

<template>
  <q-btn
    :class="`${fullwidth ? 'full-width' : ''}`"
    :color="color"
    label="Submit"
    size="lg"
    text-color="dark"
    type="submit"
    v-close-popup
  />
</template>
