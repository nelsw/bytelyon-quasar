<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useSitemapBotResultsStore } from 'stores/sitemap/result-store';
import { QTree } from 'quasar';
import FilterInput from 'components/input/FilterInput.vue';
import type { Page, SitemapNode } from 'src/types/model';
import { useSitemapBotStore } from 'stores/sitemap/bot-store';
import { usePageStore } from 'stores/page-store';

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
const $bots = useSitemapBotStore();
const $store = useSitemapBotResultsStore();
const $pages = usePageStore();

const nodes = ref<SitemapNode[]>([]);
const pages = ref<Page[]>([]);

const treeRef = useTemplateRef<QTree>('my-sitemap-tree');
const splitterModel = ref(50);
const selected = ref<string>('');
const expanded = ref<string[]>([]);
const filter = ref<string>('');

const onChange = async (botId: string | string[] | undefined) => {
  if ($bots.model.size === 0) await $bots.load();

  if (typeof botId !== 'string' || botId === '') botId = $route.params.botId;
  if (typeof botId !== 'string' || botId === '') return;

  const target = $bots.model.get(botId)?.target;
  if (!target) return;

  if (!$store.model.find((m) => m.label === target)) await $store.load(target);

  const node = $store.model.find((m) => m.label === target);
  if (!node?.label) return;

  if (nodes.value.length === 0) {
    nodes.value = [node];
  }
  expanded.value = [node.label];
  selected.value = node.label;
};

watch(selected, async (newVal, oldVal) => {
  const newN = treeRef.value?.getNodeByKey(newVal);
  const oldN = treeRef.value?.getNodeByKey(oldVal);
  console.log(newVal, newN, oldN);
  if (newN) {
    treeRef.value?.setExpanded(newVal, true);
    const url = (newN as SitemapNode).url;
    await $pages.load(url);
    pages.value = $pages.model.find((p) => p.url === url)?.pages || [];
  } else if (oldN) {
    treeRef.value?.setExpanded(oldVal, false);
  }
});
watch(() => $route.params.botId, onChange);

onMounted(onChange);
</script>

<template>
  <q-page class="absolute-full">
    <q-splitter v-model="splitterModel" :limits="[35, 65]" class="full-height">
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
          <pre>
{{ pages }}
            </pre
          >
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>
