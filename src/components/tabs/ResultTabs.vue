<script setup lang="ts">
import { Name, type Results, ResultType, ResultTypes } from 'src/types/results';
import ResultTable from 'components/table/ResultTable.vue';

defineProps<{
  results: Results;
}>();
const model = defineModel<string>({
  default: Name(ResultType.ORGANIC),
});
const icon = (s: string): string => {
  switch (s) {
    case 'Organic':
      return 'mdi-leaf-circle-outline';
    case 'Sponsored':
      return 'mdi-credit-card-search-outline';
    case 'Videos':
      return 'mdi-movie-search-outline';
    case 'Forums':
      return 'mdi-comment-search-outline';
    case 'Articles':
      return 'mdi-book-search-outline';
    default:
      return 'mdi-file-search-outline';
  }
};
</script>

<template>
  <div class="q-ma-sm">
    <q-tabs
      v-model="model"
      dense
      active-color="indigo"
      indicator-color="indigo"
      align="justify"
      narrow-indicator
    >
      <q-tab v-for="t in ResultTypes" :key="t" :name="Name(t)">
        <span>
          <q-icon :name="icon(Name(t))" size="xs" />
          {{ Name(t) }}
        </span>
      </q-tab>
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="model" animated transition-prev="fade" transition-next="fade">
      <q-tab-panel
        v-for="t in ResultTypes"
        :key="t"
        :name="Name(t)"
        :label="Name(t)"
        style="padding: 0"
      >
        <ResultTable v-if="t === ResultType.ORGANIC" :name="Name(t)" :rows="results?.organic ?? []" />
        <ResultTable v-if="t === ResultType.SPONSORED" :name="Name(t)" :rows="results?.sponsored ?? []" />
        <ResultTable v-if="t === ResultType.VIDEOS" :name="Name(t)" :rows="results?.videos ?? []" />
        <ResultTable v-if="t === ResultType.FORUMS" :name="Name(t)" :rows="results?.forums ?? []" />
        <ResultTable v-if="t === ResultType.ARTICLES" :name="Name(t)" :rows="results?.articles ?? []" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
