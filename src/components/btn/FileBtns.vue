<script setup lang="ts">
import ViewImgBtn from 'components/btn/ViewImgBtn.vue';
import DownloadHtmlBtn from 'components/btn/DownloadHtmlBtn.vue';
import ViewJsonBtn from 'components/btn/ViewJsonBtn.vue';
import { useBotStore } from 'stores/bot-store';
import { onMounted, ref, watch } from 'vue';
import { type QTreeNode } from 'quasar';

const store = useBotStore();

const props = defineProps<{
  type: string;
  id: string;
  date: string;
}>();

const enabled = ref(false);
const title = ref<string>('');
const imgUrl = ref<string>('');
const htmlUrl = ref<string>('');
const jsonContent = ref<object>({});

watch(props, () => {
  console.log(JSON.stringify(props, null, 2));
  if (props.type !== 'search') {
    enabled.value = false;
    return;
  }
  const node: QTreeNode = store.find(props.type, props.id, props.date) as QTreeNode;
  console.log(node);
  if (!node) {
    enabled.value = false;
    return;
  }
  title.value = [props.type, props.id, props.date].join('-');
  imgUrl.value = node.data.img;
  htmlUrl.value = node.data.html;
  jsonContent.value = node.data.json.results;
  enabled.value = true;
});

onMounted(() => {
  if (props.type !== 'search') {
    return;
  }
  const node: QTreeNode = store.find(props.type, props.id, props.date) as QTreeNode;
  console.log(node);
  if (!node) {
    return;
  }
  title.value = [props.type, props.id, props.date].join('-');
  imgUrl.value = node.data.img;
  htmlUrl.value = node.data.html;
  jsonContent.value = node.data.json.results;
});
</script>

<template>
  <div v-if="enabled">
    <ViewImgBtn :title="title" :url="imgUrl" />
    <DownloadHtmlBtn :url="htmlUrl" />
    <ViewJsonBtn :title="title" :content="jsonContent" />
  </div>
</template>
