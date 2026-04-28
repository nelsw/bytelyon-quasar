<script setup lang="ts">
defineProps<{
  color: string;
}>();
</script>

<template>
  <q-btn
    class="full-width"
    :label="color === 'green-13' ? 'Create' : 'Update'"
    :color="color"
    v-close-popup
    type="submit"
    text-color="dark"
    size="lg"
  />
</template>
