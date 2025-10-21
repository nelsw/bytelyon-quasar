<script setup lang="ts">
import { computed } from 'vue';
const model = defineModel<boolean>({
  required: false,
  default: false,
});

defineProps<{
  iconRight?: boolean;
}>()
const icon = computed(() => model.value ? 'mdi-chevron-down' : 'mdi-chevron-up')
</script>

<template>
  <q-btn @click="model = !model">
    <q-icon v-if="iconRight" :name="icon" />
    <slot/>
    <q-icon v-if="!iconRight" :name="icon" />
  </q-btn>
</template>

<style scoped></style>
