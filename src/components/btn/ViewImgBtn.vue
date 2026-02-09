<script setup lang="ts">
import ImgDialog from 'components/dialog/ImgDialog.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
  title: string;
  url: string;
}>();
const model = ref<boolean>(false);
const color = computed(() => (props.url === '' ? 'grey-9' : 'cyan-6'));
</script>

<template>
  <q-btn @click="model=true;" :color="color" size="sm" dense flat>
    <q-icon :color="color" name="mdi-monitor-screenshot" size="xs" />
  </q-btn>
  <ImgDialog v-model="model" :title="title" :src="url" />
</template>
