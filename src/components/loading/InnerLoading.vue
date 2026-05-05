<script setup lang="ts">
defineProps<{
  color?: string | undefined;
  label?: string | undefined;
}>();
const model = defineModel<boolean>();
</script>

<template>
  <q-inner-loading
    :showing="model"
    :color="color ?? 'primary'"
    :label-class="`text-${color ?? 'primary'}`"
    :label="label"
    label-style="font-size: 1.1em"
  />
</template>
