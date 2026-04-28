<script setup lang="ts">
defineProps<{
  url: string;
}>();
const onClick = (s: string) => open(s, '_blank');
</script>

<template>
  <q-btn @click="onClick(url)" dense flat>
    <q-icon name="mdi-open-in-new" />
  </q-btn>
</template>
