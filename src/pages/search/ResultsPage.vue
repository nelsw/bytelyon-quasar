<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useSearchBotResultsStore } from 'stores/search/result-store';
import { useRoute } from 'vue-router';
import type { SearchBotData } from 'src/types/model';
import { QTree } from 'quasar';
import SearchTable from 'components/table/SearchTable.vue';

const splitterLimits = [200, 200];
const thumbStyle = {
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: '0.75',
};
const barStyle = {
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '9px',
  opacity: '0.2',
};

const $route = useRoute();
const $results = useSearchBotResultsStore();

const results = ref<SearchBotData[]>([]);
const selected = ref<string>('');
const splitterModel = ref(200);

const onChange = async () => {
  selected.value = '';
  results.value = [];
  results.value = await $results.Retrieve($route.params.botId as string);
  selected.value = results.value?.[0]?.id ?? '';
};

const result = computed(() =>
  results.value?.find((n: SearchBotData) => n.id === selected.value),
);

onMounted(onChange);
watch(() => $route.params.botId, onChange);
</script>

<template>
  <q-page class="absolute-full">
    <q-splitter
      v-model="splitterModel"
      :limits="splitterLimits"
      class="full-height"
      separator-class="bg-grey-9"
      separator-style="width:.5px;"
      unit="px"
    >
      <template #before>
        <q-scroll-area
          :visible="false"
          :horizontal-offset="[0, 2]"
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 100vh"
        >
          <q-tree
            ref="my-search-result-tree"
            :nodes="results"
            v-model:selected="selected"
            node-key="id"
            selected-color="primary"
            accordion
            no-selection-unset
          />
        </q-scroll-area>
      </template>
      <template #after>
        <q-scroll-area
          :visible="false"
          :horizontal-offset="[0, 2]"
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 100vh; max-width: 100vw"
        >
          <div class="q-pa-md">
            <SearchTable v-if="result" v-model="result" />
          </div>
        </q-scroll-area>
      </template>
    </q-splitter>
  </q-page>
</template>
