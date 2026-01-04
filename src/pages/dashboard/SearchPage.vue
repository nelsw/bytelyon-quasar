<script setup lang="ts">
import { useBotStore } from 'stores/bot-store';
import { computed, onMounted, ref, watch } from 'vue';
import SerpResultTabs from 'components/tabs/SerpResultTabs.vue';
import XFabAction from 'components/fab/XFabAction.vue';
import JsonDialog from 'components/dialog/JsonDialog.vue';
import ImgDialog from 'components/dialog/ImgDialog.vue';
import type { QTreeNode } from 'quasar';

const props = defineProps<{
  id?: string;
  date?: string;
}>();

const store = useBotStore();
const fabModel = ref<boolean>(true);
const imgModel = ref<boolean>(false);
const jsonModel = ref<boolean>(false);
const htmlModel = ref<boolean>(false);
const node = ref<QTreeNode | null>(null);

const title = computed(() => `${props.id} - ${props.date}`);
onMounted(() => {
  node.value = store.find('search', props.id, props.date);
});
watch(props, () => {
  console.log(props.id, props.date);
  node.value = store.find('search', props.id, props.date);
});
</script>

<template>
  <SerpResultTabs v-if="id && date && node" :results="node.data?.json?.results" />
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-fab
      v-model="fabModel"
      color="yellow-10"
      direction="up"
      square
      label="Result Files"
      text-color="grey-10"
      vertical-actions-align="right"
    >
      <template #icon="{ opened }">
        <q-icon
          :class="{ 'example-fab-animate--hover': opened !== true }"
          name="mdi-file-multiple"
        />
      </template>

      <template #active-icon="{ opened }">
        <q-icon :class="{ 'example-fab-animate': opened === true }" name="mdi-file-multiple" />
      </template>

      <x-fab-action
        color="yellow-9"
        icon="mdi-download"
        label="Download Source"
        @click="htmlModel = true"
      />
      <x-fab-action
        color="yellow-8"
        icon="mdi-image"
        label="View Screenshot"
        @click="imgModel = true"
      />
      <x-fab-action
        color="yellow-7"
        icon="mdi-code-json"
        label="Copy JSON"
        @click="jsonModel = true"
      />
    </q-fab>
  </q-page-sticky>
  <ImgDialog v-if="id && date && node" v-model="imgModel" :title="title" :src="node.data.img" />
  <JsonDialog
    v-if="id && date && node"
    v-model="jsonModel"
    :title="title"
    :content="node.data.json.results"
  />
  <iframe v-if="id && date && node && htmlModel" :src="node.data.html" style="display: none" />
</template>
