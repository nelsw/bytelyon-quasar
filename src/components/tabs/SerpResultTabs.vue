<script setup lang="ts">
import ResultsTable from 'components/table/ResultsTable.vue';
import type { ProwlerSearchPageResults } from 'src/types/prowler';
import { ResultTypeIcon, SearchPageResultType as Type } from 'src/types/prowler';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  results: ProwlerSearchPageResults;
}>();

const model = defineModel<string>({
  default: 'Sponsored',
});

const tabs = ref<Type[]>([]);

onMounted(() => {
  tabs.value = Object.values(Type).filter((s) => {
    switch (s) {
      case Type.Sponsored:
        return props.results.sponsored.length > 0;
      case Type.Organic:
        return props.results.organic.length > 0;
      case Type.Video:
        return props.results.video.length > 0;
      case Type.Article:
        return props.results.article.length > 0;
      case Type.AlsoAsked:
        return props.results.also_asked.length > 0;
      case Type.MoreProducts:
        return props.results.more_products.length > 0;
      case Type.Forum:
        return props.results.forum.length > 0;
      case Type.PopularProducts:
        return props.results.popular_products.length > 0;
      case Type.RelatedQuery:
        return props.results.related_query.length > 0;
    }
  });
});
</script>

<template>
  <q-tabs
    v-model="model"
    dense
    active-color="indigo-12"

    align="left"
    narrow-indicator
  >
    <q-tab v-for="t in tabs" :key="t" :name="t">
      <span>
        <q-icon :name="ResultTypeIcon(t)" size="xs" />
        {{ t }}
      </span>
    </q-tab>
  </q-tabs>

  <q-separator />
  <q-tab-panels v-model="model" animated transition-prev="fade" transition-next="fade">
    <q-tab-panel v-for="t in tabs" :key="t" :name="t" :label="t" style="padding: 0">
      <ResultsTable v-if="t === Type.Sponsored" :name="t" :rows="results.sponsored" />
      <ResultsTable v-if="t === Type.Organic" :name="t" :rows="results.organic" />
      <ResultsTable v-if="t === Type.Video" :name="t" :rows="results.video" />
      <ResultsTable v-if="t === Type.Forum" :name="t" :rows="results.forum" />
      <ResultsTable v-if="t === Type.Article" :name="t" :rows="results.article" />
      <ResultsTable v-if="t === Type.PopularProducts" :name="t" :rows="results.popular_products" />
      <ResultsTable v-if="t === Type.AlsoAsked" :name="t" :rows="results.also_asked" />
      <ResultsTable v-if="t === Type.RelatedQuery" :name="t" :rows="results.related_query" />
      <ResultsTable v-if="t === Type.MoreProducts" :name="t" :rows="results.more_products" />
    </q-tab-panel>
  </q-tab-panels>
</template>
