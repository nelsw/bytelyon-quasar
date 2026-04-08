<script setup lang="ts">
import { onMounted, onUpdated, ref, useTemplateRef, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useSitemapBotResultsStore } from 'stores/sitemap/result-store';
import { QTree } from 'quasar';
import FilterInput from 'components/input/FilterInput.vue';
import type { PagesNode, SitemapBotResultGroup } from 'src/types/model';

const $store = useSitemapBotResultsStore();
const $router = useRouter();

const result = ref<SitemapBotResultGroup>({
  botId: '',
  target: '',
  type: '',
  domain: '',
  urls: [],
  node: {
    id: '',
    html: '',
    img: '',
    title: '',
    path: '',
    domain: '',
    pages: [],
    url: '',
  },
});

const splitterModel = ref(350);
const treeRef = useTemplateRef<QTree>('my-tree');
const selected = ref<string>('');
const filter = ref<string>('');

watch(selected, (val) => {
  const n: PagesNode = treeRef.value?.getNodeByKey(val);
  console.debug(`selected: ${val}`, n);
});

const onchange = async () => {
  const botId = $router.currentRoute.value.params.botId as string;
  let r = $store.find(botId);
  if (r === null) {
    await $store.load(botId);
    r = $store.find(botId);
  }
  if (r !== null) result.value = r;
};

onUpdated(onchange);
onMounted(onchange);
</script>

<template>
  <q-page class="absolute-full">
    <q-splitter
      v-model="splitterModel"
      :limits="[205, 500]"
      class="full-height"
      separator-class="bg-grey-9"
      separator-style="width:.5px;"
      unit="px"
    >
      <template #before>
        <FilterInput v-model="filter" class="q-pt-xs q-px-md" />
        <q-separator inset />
        <q-tree
          ref="my-tree"

          v-model:selected="selected"
          node-key="label"
          :filter="filter"
          :nodes="[result.node]"
          dense
        >
        </q-tree>
      </template>
      <template #after> </template>
    </q-splitter>
  </q-page>
</template>
