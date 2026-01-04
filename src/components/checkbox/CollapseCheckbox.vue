<script setup lang="ts">
const model = defineModel<boolean>();
</script>

<template>
  <q-checkbox
    v-model="model"
    checked-icon="mdi-arrow-collapse-left"
    unchecked-icon="mdi-arrow-collapse-right"
    dense
    unelevated
    sq
  />
</template>
