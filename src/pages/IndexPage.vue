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
import ArticleDialog from 'components/dialog/ArticleDialog.vue';

const $nodeStore = useNodeStore();
const splitterModel = ref(350);
const selected = ref<string>('');
const bot = ref<BotNode | undefined>();
const treeRef = useTemplateRef<QTree>('my-tree');
const filter = ref<string>('');

watch(selected, (val) => {
  console.debug(`selected: ${val}`);
  treeRef.value?.setExpanded(val, true);
  bot.value = treeRef.value?.getNodeByKey(val);
});

watch(filter, (val) => {
  if (val === null) {
    treeRef.value?.collapseAll();
    treeRef.value?.setExpanded(selected.value, true);
  } else {
    treeRef.value?.expandAll();
  }
});

const onUpdate = (val: string) => selected.value = val;
const dialog = ref<boolean>(false);
</script>
<template>
  <ArticleDialog v-model="dialog" />
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
            <div class="flex q-gutter-md">
              <LogoBtn @click="dialog = true" />
              <span class="text-h5 text-grey-5 text-weight-medium">ByteLyon</span>
            </div>
          </div>
          <q-separator />
          <div style="height: calc(100vh - 67px)">
            <FilterInput v-model="filter" class="q-pt-xs q-px-md" :disable="selected === ''" />
            <q-separator inset />
            <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
              <q-scroll-area style="height: calc(100% - 60px)">
                <q-tree
                  ref="my-tree"
                  class="q-pa-md"
                  :nodes="$nodeStore.model"
                  :filter="filter"
                  node-key="id"
                  selected-color="primary"
                  v-model:selected="selected"
                  accordion
                  no-selection-unset
                  @lazy-load="$nodeStore.Load"
                />
              </q-scroll-area>
            </transition>
          </div>
        </div>
      </template>
      <template #after>
        <HomePage v-if="bot === undefined" @update="onUpdate" />
        <BotPage v-else-if="bot.botId === '' || bot.botId === bot.id" @update="onUpdate" :bot="bot" />
        <SitemapPage v-else-if="bot.type === BotType.Sitemap" :node="bot" />
        <NewsPage v-else-if="bot.type === BotType.News" v-model="bot" />
        <SearchPage v-else-if="bot.type === BotType.Search" :node="bot" />
      </template>
    </q-splitter>
  </q-page>
</template>
