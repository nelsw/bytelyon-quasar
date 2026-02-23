<script setup lang="ts">
import { ref } from 'vue';
import LogoBtn from 'components/btn/LogoBtn.vue';
import BotTree from 'components/tree/BotTree.vue';
import HomePage from 'pages/HomePage.vue';
import BotPage from 'pages/BotPage.vue';
import type { Bot, BotTable, Search, Sitemap } from 'src/types/model';
import { BotType } from 'src/types/model';
import SitemapPage from 'pages/SitemapPage.vue';
import NewsPage from 'pages/NewsPage.vue';
import RefreshBtn from 'components/btn/RefreshBtn.vue';
import SearchPage from 'pages/SearchPage.vue';
import EmailBtn from 'components/btn/EmailBtn.vue';

const splitterModel = ref(350);
const selected = ref<string>('');
const bot = ref<Bot>();
const data = ref<Search | Sitemap | BotTable>();

const onUpdateBot = (b: Bot) => {
  bot.value = b;
  data.value = undefined;
};
const onUpdateData = (d: Search | Sitemap | BotTable) => {
  bot.value = undefined;
  data.value = d;
};
const onUpdated = (b: Bot) => {
  bot.value = b;
  selected.value = b.Type;
};
const onDeleted = () => (bot.value = undefined);
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

          <div style="height: calc(100vh - 102px)">
            <BotTree
              v-model:selected="selected"
              @update:bot="onUpdateBot"
              @update:data="onUpdateData"
            />
          </div>

          <div class="absolute-bottom bg-dark">
            <q-separator />
            <q-btn-group push spread flat square>
              <EmailBtn />
              <RefreshBtn />
            </q-btn-group>
          </div>
        </div>
      </template>
      <template #after>
        <HomePage v-if="bot === undefined && data === undefined" @update:bot="onUpdated" />
        <BotPage
          v-else-if="bot !== undefined && data === undefined"
          :bot="bot"
          @deleted="onDeleted"
        />
        <SitemapPage
          v-else-if="(data as Sitemap).Bot.Type === BotType.Sitemap"
          :data="data as Sitemap"
        />
        <NewsPage
          v-else-if="(data as BotTable).Bot.Type === BotType.News"
          v-model="data as BotTable"
        />
        <SearchPage
          v-else-if="(data as BotTable).Bot.Type === BotType.Search"
          :data="data as Search"
        />
      </template>
    </q-splitter>
  </q-page>
</template>
