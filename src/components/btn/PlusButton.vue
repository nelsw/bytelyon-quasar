<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <q-btn color="green-14" icon="mdi-plus" flat dense>
    <q-tooltip class="bg-white text-green-10">New {{name}}</q-tooltip>
  </q-btn>
</template>

<style scoped lang="scss"></style>
