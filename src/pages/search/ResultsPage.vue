<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useSearchBotResultsStore } from 'stores/search/result-store';
import { useRoute } from 'vue-router';
import { date, QTree } from 'quasar';
import SearchTable from 'components/table/SearchTable.vue';
import ScrollArea from 'components/scroll-area/ScrollArea.vue';

const splitterLimits = [200, 200];

const $route = useRoute();
const botId = computed(() => $route.params.botId as string);

const $results = useSearchBotResultsStore();
const splitterModel = ref(200);
const label = (s:string) => {
  const d = date.extractDate(s, 'MM/DD/YYYY, h:mm:ssA');
  const ts = date.formatDate(d, 'YYYY-MM-DDTHH:mm:ss.SSSZ').split('.000')[0] + '.000Z'
  const dd = date.extractDate(ts, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
  return dd.toLocaleString();
}
onMounted(async () => $results.load(botId.value));
watch(() => $route.params.botId, async () => $results.load(botId.value));
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
        <ScrollArea style="height: 100vh">
          <q-tree
            ref="my-search-result-tree"
            v-model:selected="$results.resultId"
            :nodes="$results.find(botId)"
            class="q-mt-sm"
            node-key="id"
            selected-color="primary"
            accordion
            no-selection-unset
          >
            <template v-slot:default-header="prop">
              {{label(prop.node.label)}}
            </template>
          </q-tree>
        </ScrollArea>
      </template>
      <template #after>
        <ScrollArea style="height: 100vh; max-width: 100vw">
          <div class="q-pa-md">
            <SearchTable v-if="$results.selection" v-model="$results.selection" />
          </div>
        </ScrollArea>
      </template>
    </q-splitter>
  </q-page>
</template>
