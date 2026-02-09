<script setup lang="ts">
import { computed, ref } from 'vue';
import ToolbarDialog from 'components/dialog/ToolbarDialog.vue';

const props = defineProps<{
  title: string;
  url: string;
}>();
const model = ref<boolean>(false);
const color = computed(() => (props.url === '' ? 'grey-9' : 'cyan-6'));
</script>

<template>
  <q-btn @click="model = true" :color="color" size="sm" dense flat>
    <q-icon :color="color" name="mdi-monitor-screenshot" size="xs" />
  </q-btn>
  <ToolbarDialog v-model="model" :title="title">
    <template #content>
      <q-img :src="url" />
    </template>
  </ToolbarDialog>
</template>
