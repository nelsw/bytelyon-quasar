<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from 'vue';
import { useSearchBotResultsStore } from 'stores/search/result-store';
import { useRouter } from 'vue-router';
import type { BotNode } from 'src/types/model';
import SearchPage from 'pages/SearchPage.vue';
import { QTree } from 'quasar';

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

const $router = useRouter();
const $store = useSearchBotResultsStore();

const botNodes = ref<BotNode[]>([]);
const botId = ref<string>('');
const splitterModel = ref(200);
const selected = ref<string>('');

const onChange = async () => {
  botId.value = $router.currentRoute.value.params.botId as string;
  const nodes = await $store.get(botId.value);
  if (nodes !== null) {
    botNodes.value = nodes;
    if (nodes.length > 0 && nodes[0]?.id) {
      selected.value = nodes[0].id;
    }
  }
};

const botNode = computed(() => botNodes.value.find((n: BotNode) => n.id === selected.value));

onMounted(onChange);
onUpdated(onChange);
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
            :nodes="botNodes"
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
            <SearchPage v-if="botNode" :node="botNode" />
          </div>
        </q-scroll-area>
      </template>
    </q-splitter>
  </q-page>
</template>

<style scoped lang="scss"></style>
