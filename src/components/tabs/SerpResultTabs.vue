<script setup lang="ts">
import ResultsTable from 'components/table/ResultsTable.vue';
import { onMounted, ref, watch } from 'vue';
import type { QTreeNode } from 'quasar';
import { SearchColor } from 'src/types/base';

interface ProwlerSearchPageResult {
  link: string;
  position: number;
  snippet: string;
  source: string;
  price?: string;
  title: string;
}

interface ProwlerSearchPageResults {
  also_asked: ProwlerSearchPageResult[];
  article: ProwlerSearchPageResult[];
  forum: ProwlerSearchPageResult[];
  more_products: ProwlerSearchPageResult[];
  organic: ProwlerSearchPageResult[];
  popular_products: ProwlerSearchPageResult[];
  related_query: ProwlerSearchPageResult[];
  sponsored: ProwlerSearchPageResult[];
  video: ProwlerSearchPageResult[];
}

enum SearchPageResultType {
  Sponsored = 'Sponsored',
  Organic = 'Organic',
  AlsoAsked = 'AlsoAsked',
  Article = 'Article',
  Forum = 'Forum',
  MoreProducts = 'MoreProducts',
  PopularProducts = 'PopularProducts',
  RelatedQuery = 'RelatedQuery',
  Video = 'Video',
}

const defaultResults: ProwlerSearchPageResults = {
  also_asked: [],
  article: [],
  forum: [],
  more_products: [],
  organic: [],
  popular_products: [],
  related_query: [],
  sponsored: [],
  video: [],
};

const node = defineModel<QTreeNode>('node', { required: true });

const tab = ref<SearchPageResultType>();
const tabs = ref<SearchPageResultType[]>([]);
const results = ref<ProwlerSearchPageResults>(defaultResults);

const rows = (t: SearchPageResultType, r: ProwlerSearchPageResults) => {
  switch (t) {
    case SearchPageResultType.Organic:
      return r.organic;
    case SearchPageResultType.Sponsored:
      return r.sponsored;
    case SearchPageResultType.Video:
      return r.video;
    case SearchPageResultType.Forum:
      return r.forum;
    case SearchPageResultType.Article:
      return r.article;
    case SearchPageResultType.PopularProducts:
      return r.popular_products;
    case SearchPageResultType.AlsoAsked:
      return r.also_asked;
    case SearchPageResultType.RelatedQuery:
      return r.related_query;
    case SearchPageResultType.MoreProducts:
      return r.more_products;
  }
};

const update = () => {
  if (node.value?.data?.json?.results) {
    results.value = node.value.data?.json?.results as ProwlerSearchPageResults;
  } else {
    results.value = defaultResults;
  }
  tabs.value = Object.values(SearchPageResultType);
  if (tabs.value.length > 0) {
    tab.value = tabs.value[0];
  }
};

const splitterModel = ref(153);

watch(node, update);
onMounted(update);
</script>

<template>
  <q-splitter v-model="splitterModel" class="full-height" dark unit="px">
    <template v-slot:before>
      <q-tabs
        v-model="tab"
        dense
        :active-color="SearchColor"
        vertical
        no-caps
        inline-label
        align="left"
        shrink
        stretch
      >
        <q-tab
          v-for="t in tabs"
          :key="t"
          :name="t"
          style="padding: 0"
          :label="t"
          :disable="rows(t, results).length === 0"
        />
      </q-tabs>
    </template>
    <q-separator />
    <template v-slot:after>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel v-for="t in tabs" :key="t" :name="t" :label="t" style="padding: 0">
          <ResultsTable :name="t" :rows="rows(t, results)" />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>
