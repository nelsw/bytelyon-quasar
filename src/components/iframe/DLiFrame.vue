<script setup lang="ts">
import { watch } from 'vue';

defineProps<{ url: string }>();

const model = defineModel<boolean>({ required: true });

watch(model, () => {
  if (model.value) {
    setTimeout(() => (model.value = false), 1000);
  }
});
</script>

<template>
  <iframe v-if="model" :src="url" style="display: none" />
</template>
