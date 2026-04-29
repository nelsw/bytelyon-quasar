<script setup lang="ts">
defineProps<{
  color?: string | undefined;
  fullwidth?: boolean | undefined;
  label?: string | undefined;
  outline?: boolean | undefined;
}>();
</script>

<template>
  <q-btn
    :class="`${fullwidth ? 'full-width' : ''}`"
    :color="color ?? 'green-13'"
    :label="label ?? 'Submit'"
    :outline="outline"
    :text-color="outline ? (color ?? 'green-13') : 'dark'"
    size="lg"
    type="submit"
    v-close-popup
  />
</template>
