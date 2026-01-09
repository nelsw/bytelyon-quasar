<script setup lang="ts">
defineProps<{
  color: string;
}>();
const model = defineModel<boolean>({required: true});
</script>

<template>
  <q-checkbox v-model="model" :color="color" label="Enabled" @click="model!=model"/>
</template>

