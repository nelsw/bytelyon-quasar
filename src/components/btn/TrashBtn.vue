<script setup lang="ts">
defineProps<{
  disable?: boolean;
}>();
</script>
<template>
  <q-btn :color="disable ? 'grey-9' : 'pink-13'" icon="mdi-delete-outline" dense flat />
</template>
