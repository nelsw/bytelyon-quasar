<script setup lang="ts">
import ResultsTable from 'components/table/ResultsTable.vue';
import type { ProwlerSearchPageResults } from 'src/types/prowler';
import { SearchPageResultType, SearchPageResultType as Type } from 'src/types/prowler';
import { onMounted, ref, watch } from 'vue';
import type { QTreeNode } from 'quasar';
import { SearchColor } from 'src/types/base';

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
    case Type.Organic:
      return r.organic;
    case Type.Sponsored:
      return r.sponsored;
    case Type.Video:
      return r.video;
    case Type.Forum:
      return r.forum;
    case Type.Article:
      return r.article;
    case Type.PopularProducts:
      return r.popular_products;
    case Type.AlsoAsked:
      return r.also_asked;
    case Type.RelatedQuery:
      return r.related_query;
    case Type.MoreProducts:
      return r.more_products;
  }
};

const update = () => {
  if (node.value.data?.json?.results) {
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
onMounted(() => {});
</script>

<template>
  <q-splitter
    v-model="splitterModel"
    class="full-height"
    dark
    unit="px"
  >
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
    <template v-slot:after>
      <q-separator />
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
