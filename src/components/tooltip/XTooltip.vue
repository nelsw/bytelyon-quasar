<script setup lang="ts">
defineProps<{
  disabled?: boolean | undefined;
  text: string | undefined;
}>();
</script>

<template>
  <q-tooltip v-if="text && !disabled" class="text-center">
    <span v-html="text" />
  </q-tooltip>
</template>
