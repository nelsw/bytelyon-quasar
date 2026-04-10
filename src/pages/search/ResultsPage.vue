<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useSearchBotResultsStore } from 'stores/search/result-store';
import { useRoute } from 'vue-router';
import type { Bot, SearchBotData } from 'src/types/model';
import SearchPage from 'pages/SearchPage.vue';
import { QTree } from 'quasar';
import { useNewsBotStore } from 'stores/news/bot-store';

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
const $bots = useNewsBotStore();
const $store = useSearchBotResultsStore();

const bot = ref<Bot>();
const botNodes = ref<SearchBotData[]>([]);
const splitterModel = ref(200);
const selected = ref<string>('');

const onChange = async (botId: string | string[] | undefined) => {
  if (!botId) botId = $route.params.botId;
  botId = botId as string;
  bot.value = $bots.model.get(botId);
  if (!$store.model.has(botId)) await $store.load(botId);
  botNodes.value = $store.model.get(botId) as SearchBotData[];
  selected.value = botNodes?.value?.[0]?.id || '';
};

const botNode = computed(() =>
  botNodes?.value?.find((n: SearchBotData) => n.id === selected.value),
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
            :nodes="botNodes ?? []"
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
            <SearchPage v-if="botNode" v-model="botNode" />
          </div>
        </q-scroll-area>
      </template>
    </q-splitter>
  </q-page>
</template>
