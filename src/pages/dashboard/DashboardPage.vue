<script setup lang="ts">
import { useProwlerStore } from 'stores/prowler-store';
import { computed, onMounted, onUpdated, ref, useTemplateRef } from 'vue';
import XSplitter from 'components/splitter/XSplitter.vue';
import FilterInput from 'components/form/FilterInput.vue';
import { useRouter } from 'vue-router';
import type { QTree, QTreeNode } from 'quasar';
import type { ProwlerSearchPage, ProwlerSitemapResult } from 'src/types/prowler';
import { NewsColor, SearchColor, SitemapColor } from 'src/types/base';

const store = useProwlerStore();
const router = useRouter();

const expanded = ref<string[]>([]);
const selected = ref<string>('');
const ticked = ref<string[]>([]);
const filter = ref<string>('');
const prowlerSitemapResult = ref<ProwlerSitemapResult | null>(null);
const prowlerSearchPage = ref<ProwlerSearchPage | null>(null);
const tree = useTemplateRef<QTree>('tree');
const tabPanelModel = ref<string>('');
const hideSplit = ref(false);

const nodes = computed((): QTreeNode[] => {
  switch (router.currentRoute.value.name) {
    case 'News':
      return store.nodes.NewsNodes;
    case 'Sitemap':
      return store.nodes.SitemapNodes;
    default:
      return store.nodes.SearchNodes;
  }
});

const selectionColor = computed(() => {
  switch (router.currentRoute.value.name) {
    case 'Sitemap':
      return SitemapColor;
    case 'Search':
      return SearchColor;
    case 'News':
    default:
      return NewsColor;
  }
});

const handleSelection = (label: string) => {
  const node = tree.value?.getNodeByKey(label);

  console.debug('handle tree node selection', label, node);
  if (node === undefined) {
    return;
  }

  switch (router.currentRoute.value.name) {
    case 'Search':
      hideSplit.value = false;
      prowlerSearchPage.value = node;
      if (prowlerSearchPage.value?.data) {
        tabPanelModel.value = 'Search';
      }
      return;
    case 'News':
      hideSplit.value = true;
      return;
    case 'Sitemap':
      hideSplit.value = false;
      prowlerSitemapResult.value = node;
      tabPanelModel.value = 'Sitemap';
      if (!isNaN(new Date(label).getTime())) {
        return;
      }
      // parent object
      tabPanelModel.value = 'scheduler';
      return;
  }
};

onUpdated(() => {
  switch (router.currentRoute.value.name) {
    case 'Sitemap':
    case 'Search':
      // hideSplit.value = false;
      return;
    case 'News':
    default:
    // hideSplit.value = true;
  }
});

onMounted(store.load);
</script>

<template>
  <x-splitter :color="selectionColor">
    <template v-slot:before>
      <div class="flex row justify-start q-mt-sm q-mx-md q-gutter-x-sm">
        <FilterInput v-model="filter" />
      </div>

      <div class="q-px-md">
        <q-tree
          ref="tree"
          class="q-tree"
          :color="selectionColor"
          v-model:selected="selected"
          v-model:expanded="expanded"
          v-model:ticked="ticked"
          :nodes="nodes"
          :filter="filter"
          tick-strategy="none"
          node-key="id"
          accordion
          :selected-color="selectionColor"
          @update:selected="handleSelection"
        />
      </div>
    </template>

    <template v-slot:after> </template>
  </x-splitter>
</template>
