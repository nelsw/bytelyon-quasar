<script setup lang="ts">
import { ref } from 'vue';
import XTooltip from 'components/tooltip/XTooltip.vue';

defineProps<{ url: string }>();

const model = ref<boolean>(false);

const handleClick = () => {
  model.value = true;
  setTimeout(() => (model.value = false), 1000);
}
</script>

<template>
  <q-btn dense flat no-caps size="sm" @click="handleClick">
    <q-icon name="mdi-download-box-outline" color="light-blue-14" size="xs" />
    <x-tooltip text="Download<br>HTML" />
  </q-btn>
  <iframe v-if="model" :src="url" style="display: none" />
</template>
