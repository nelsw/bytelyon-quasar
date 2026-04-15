<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useSearchBotResultsStore } from 'stores/search/result-store';
import { useRoute } from 'vue-router';
import { QTree } from 'quasar';
import SearchTable from 'components/table/SearchTable.vue';
import ScrollArea from 'components/scroll-area/ScrollArea.vue';

const splitterLimits = [200, 200];

const $route = useRoute();
const botId = computed(() => $route.params.botId as string);

const $results = useSearchBotResultsStore();
const splitterModel = ref(200);

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
          />
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
