<script setup lang="ts">
import { onMounted, onUpdated, ref, useTemplateRef, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useSitemapBotResultsStore } from 'stores/sitemap/result-store';
import { QTree } from 'quasar';
import FilterInput from 'components/input/FilterInput.vue';
import type { PagesNode } from 'src/types/model';

const $store = useSitemapBotResultsStore();
const $router = useRouter();

const treeRef = useTemplateRef<QTree>('my-sitemap-tree');

const splitterModel = ref(10);
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
        <FilterInput v-model="filter" class="q-pt-xs q-px-md" />
        <q-separator inset />
        <div class="q-pa-md q-gutter-sm">
          <q-tree
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
        </div>
      </template>
      <template #after>
<pre>
{{ pagesNode }}
        </pre>
      </template>
    </q-splitter>
  </q-page>
</template>
