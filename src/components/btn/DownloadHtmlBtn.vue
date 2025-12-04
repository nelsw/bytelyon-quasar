<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ url: string }>();

const model = ref<boolean>(false);

const handleClick = () => {
  model.value = true;
  setTimeout(() => (model.value = false), 1000);
}
</script>

<template>
  <q-btn dense flat no-caps size="sm" @click="handleClick">
    <q-icon name="mdi-download-box-outline" color="teal-14" size="xs" />
    <q-tooltip class="bg">Download HTML</q-tooltip>
  </q-btn>
  <iframe v-if="model" :src="url" style="display: none" />
</template>
