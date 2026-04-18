<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useSitemapBotResultsStore } from 'stores/sitemap/result-store';
import { QTree } from 'quasar';
import FilterInput from 'components/input/FilterInput.vue';
import type { Page, SitemapNode } from 'src/types/model';
import { usePageStore } from 'stores/page-store';
import ScrollArea from 'components/scroll-area/ScrollArea.vue';
import PageCard from 'components/card/PageCard.vue';

const $route = useRoute();
const $results = useSitemapBotResultsStore();
const $pages = usePageStore();

const nodes = ref<SitemapNode[]>([]);
const pages = ref<Page[]>([]);

const treeRef = useTemplateRef<QTree>('my-sitemap-tree');
const splitterModel = ref(50);
const selected = ref<string>('');
const expanded = ref<string[]>([]);
const filter = ref<string>('');

const onChange = async () => {
  await $results.load($route.params.botId as string);
  const node = $results.find($route.params.botId as string);
  if (!node?.label) return;

  nodes.value = [node];
  expanded.value = [node.label];
  selected.value = node.label;
};

watch(selected, async (newVal, oldVal) => {
  const newN = treeRef.value?.getNodeByKey(newVal);
  const oldN = treeRef.value?.getNodeByKey(oldVal);
  console.log('sitemap page selection', newN?.label, oldN?.label);
  if (newN) {
    treeRef.value?.setExpanded(newVal, true);
    const url = (newN as SitemapNode).url;
    await $pages.load(url);
    pages.value = $pages.model.get(url) || [];
  } else if (oldN) {
    treeRef.value?.setExpanded(oldVal, false);
  }
});
watch(() => $route.params.botId, onChange);

onMounted(onChange);
</script>

<template>
  <q-page class="absolute-full">
    <q-splitter v-model="splitterModel" :limits="[15, 85]" class="full-height">
      <template #before>
        <FilterInput v-model="filter" class="q-pt-sm q-px-md" />
        <q-separator inset />
        <ScrollArea style="height: calc(100vh - 49px - 51px); max-width: 100vw">
          <q-tree
            class="q-px-md q-py-sm"
            ref="my-sitemap-tree"
            v-model:selected="selected"
            v-model:expanded="expanded"
            node-key="label"
            :filter="filter"
            :nodes="nodes"
            accordion
            dense
            default-expand-all
            selected-color="primary"
          />
        </ScrollArea>
      </template>
      <template #after>
        <div class="flex row justify-evenly q-ma-xs">
          <div v-for="(p, i) in pages" :key="i" class="col-md-6 col-sm-12">
            <PageCard :page="p" class="q-ma-xs"/>
          </div>
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>
