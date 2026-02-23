<script setup lang="ts">
defineProps<{
  color: string;
  label: string;
}>();
</script>

<template>
  <q-btn
    class="full-width"
    :label="label"
    :color="color"
    v-close-popup
    type="submit"
    text-color="dark"
    size="lg"
  />
</template>
