<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue';
import LogoBtn from 'components/btn/LogoBtn.vue';
import HomePage from 'pages/HomePage.vue';
import BotPage from 'pages/BotPage.vue';
import type { BotNode } from 'src/types/model';
import { BotType } from 'src/types/model';
import NewsPage from 'pages/NewsPage.vue';
import SitemapPage from 'pages/SitemapPage.vue';
import SearchPage from 'pages/SearchPage.vue';
import { useNodeStore } from 'stores/node-store';
import FilterInput from 'components/input/FilterInput.vue';
import { QTree } from 'quasar';

const $nodes = useNodeStore();
const splitterModel = ref(350);
const selected = ref<string>('');
const bot = ref<BotNode | undefined>();
const treeRef = useTemplateRef<QTree>('my-tree');
const filter = ref<string>('');

watch(selected, (val) => {
  console.debug(`selected: ${val}`);
  treeRef.value?.setExpanded(val, true);
  onUpdateBot(treeRef.value?.getNodeByKey(val))
});

watch(filter, (val) => {
  if (val === null) {
    treeRef.value?.collapseAll();
    treeRef.value?.setExpanded(selected.value, true);
  } else {
    treeRef.value?.expandAll();
  }
});

const onUpdateBot = (b?: BotNode) => {
  console.debug('onUpdateBot', JSON.stringify(b, null, 2));
  bot.value = b;
  selected.value = b?.id as string;
};

const onDeleted = () => {
  const b:BotNode = bot.value as BotNode;
  console.debug('onDeletedBot', JSON.stringify(b, null, 2));

  const ok = $nodes.Remove(b);
  console.log('onDeletedBot', ok);
  if (!ok) return;

  bot.value = undefined
  selected.value = b.type;
};

</script>
<template>
  <q-page class="absolute-full">
    <q-splitter
      v-model="splitterModel"
      :limits="[205, 500]"
      class="full-height"
      separator-class="bg-grey-9"
      separator-style="width:.5px;"
      unit="px"
    >
      <template #before>
        <div class="bg-dark">
          <div class="flex q-pa-md">
            <div class="flex q-gutter-md no-pointer-events">
              <LogoBtn />
              <span class="text-h5 text-grey-5 text-weight-medium">ByteLyon</span>
            </div>
          </div>
          <q-separator />
          <div style="height: calc(100vh - 67px)">
            <FilterInput v-model="filter" class="q-pt-xs q-px-md" />
            <q-separator inset />
            <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
              <q-scroll-area style="height: calc(100% - 60px)">
                <q-tree
                  ref="my-tree"
                  class="q-pa-md"
                  :nodes="$nodes.model"
                  :filter="filter"
                  node-key="id"
                  selected-color="primary"
                  v-model:selected="selected"
                  accordion
                  no-selection-unset
                  @lazy-load="$nodes.LazyLoad"
                />
              </q-scroll-area>
            </transition>
          </div>
        </div>
      </template>
      <template #after>
        <HomePage v-if="bot === undefined" @update:bot="onUpdateBot" />
        <BotPage v-else-if="bot.botId === '' || bot.id === bot.botId" :bot="bot" @deleted="onDeleted" />
        <SitemapPage v-else-if="bot.type === BotType.Sitemap" :node="bot" />
        <NewsPage v-else-if="bot.type === BotType.News" v-model="bot" />
        <SearchPage v-else-if="bot.type === BotType.Search" :node="bot" />
      </template>
    </q-splitter>
  </q-page>
</template>
