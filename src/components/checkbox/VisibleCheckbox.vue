<script setup lang="ts">
const model = defineModel<boolean | string[]>({
  required: true,
})
</script>

<template>
  <q-checkbox
    color="light-blue"
    v-model="model"
    checked-icon="mdi-eye-outline"
    unchecked-icon="mdi-eye-off-outline"
  />
</template>
