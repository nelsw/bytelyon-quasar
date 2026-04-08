<script setup lang="ts">
import { onMounted, onUpdated, ref, useTemplateRef, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useSitemapBotResultsStore } from 'stores/sitemap/result-store';
import { QTree } from 'quasar';
import FilterInput from 'components/input/FilterInput.vue';
import type { PagesNode } from 'src/types/model';

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

const $store = useSitemapBotResultsStore();
const $router = useRouter();

const treeRef = useTemplateRef<QTree>('my-sitemap-tree');

const splitterModel = ref(15);
const splitterLimits = [15, 85];
const selected = ref<string>('');
const expanded = ref<string[]>([]);
const filter = ref<string>('');
const nodes = ref<PagesNode[]>([]);
const botId = ref<string>('');
const pagesNode = ref<PagesNode | undefined>(undefined);

const onchange = async () => {
  botId.value = $router.currentRoute.value.params.botId as string;
  let r = $store.find(botId.value);
  if (r === null) {
    await $store.load(botId.value);
    r = $store.find(botId.value);
  }
  if (r !== null) {
    nodes.value = [r.node];
  }
};

onUpdated(onchange);
onMounted(onchange);

watch(selected, (val) => {
  pagesNode.value = treeRef.value?.getNodeByKey(val);
  console.log(val, JSON.stringify(pagesNode.value, null, 2));
  treeRef.value?.setExpanded(val, true);
});
</script>

<template>
  <q-page class="absolute-full">
    <q-splitter v-model="splitterModel" :limits="splitterLimits" class="full-height">
      <template #before>
        <FilterInput v-model="filter" class="q-pt-sm q-px-md" />
        <q-separator inset />
        <q-scroll-area
          :visible="false"
          :horizontal-offset="[0, 2]"
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: calc(100vh - 48px)"
        >
          <q-tree
            class="q-px-md q-py-sm"
            ref="my-sitemap-tree"
            v-model:selected="selected"
            v-model:expanded="expanded"
            node-key="label"
            :filter="filter"
            :nodes="nodes"
            accordion
            dense
            default-expand-all
            no-selection-unset
            selected-color="primary"
          />
        </q-scroll-area>
      </template>
      <template #after>
        <div class="q-pa-lg">
          <span class="text-h4">
            Coming soon ... an array of screen shots and downloadable content for comparison and
            analysis.
          </span>
          <pre
            >{{ pagesNode }}
        </pre
          >
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>
