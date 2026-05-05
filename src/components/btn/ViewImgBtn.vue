<script setup lang="ts">
import { ref } from 'vue';
import ToolbarDialog from 'components/dialog/ToolbarDialog.vue';

defineProps<{
  title: string;
  url: string;
  color?: string | undefined;
  size?: string | undefined;
}>();

const model = ref<boolean>(false);
</script>

<template>
  <q-btn
    @click="model = true"
    :color="url === '' ? 'grey-8' : (color ?? 'cyan-6')"
    :disable="url === ''"
    :size="size"
    icon="mdi-monitor-screenshot"
    dense
    flat
  >
    <slot />
  </q-btn>
  <ToolbarDialog v-model="model" :title="title">
    <q-img :src="url" />
  </ToolbarDialog>
</template>
