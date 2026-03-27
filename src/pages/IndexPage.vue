<script setup lang="ts">
import { ref } from 'vue';
import HomePage from 'pages/HomePage.vue';
import BotPage from 'pages/BotPage.vue';
import type { Bot, BotNewsResult, BotTable, SearchBotData, SitemapRow } from 'src/types/model';
import { BotType } from 'src/types/model';
import NewsPage from 'pages/NewsPage.vue';
import SitemapPage from 'pages/SitemapPage.vue';
import SearchPage from 'pages/SearchPage.vue';

const selected = ref<string>('');
const bot = ref<Bot>();
const data = ref<BotTable<unknown>>();

const onUpdated = (b: Bot) => {
  bot.value = b;
  selected.value = b.type;
};
const onDeleted = () => (bot.value = undefined);
</script>
<template>
  <HomePage v-if="bot === undefined && data === undefined" @update:bot="onUpdated" />
  <BotPage v-else-if="bot !== undefined && data === undefined" :bot="bot" @deleted="onDeleted" />
  <SitemapPage
    v-else-if="data?.Bot.type === BotType.Sitemap"
    :table="data as BotTable<BotType.Sitemap, SitemapRow>"
  />
  <NewsPage
    v-else-if="data?.Bot.type === BotType.News"
    v-model="data as BotTable<BotType.News, BotNewsResult>"
  />
  <SearchPage
    v-else-if="data?.Bot.type === BotType.Search"
    :table="data as BotTable<BotType.Search, SearchBotData>"
  />
</template>
