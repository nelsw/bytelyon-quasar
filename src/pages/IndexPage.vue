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
import EmailBtn from 'components/btn/EmailBtn.vue';
import RefreshBtn from 'components/btn/RefreshBtn.vue';
import SearchPage from 'pages/SearchPage.vue';

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
</script>
<template>
  <q-page style="height: 100vh">
    <q-splitter
      v-model="splitterModel"
      :limits="[225, 500]"
      class="full-height"
      separator-class="bg-grey-9"
      separator-style="width:.5px;"
      unit="px"
    >
      <template #before>
        <div class="bg-dark full-height">
          <div class="flex q-pa-md">
            <div class="flex q-gutter-md no-pointer-events">
              <LogoBtn />
              <span class="text-h5 text-grey-5 text-weight-medium">ByteLyon</span>
            </div>
            <q-space />
            <RefreshBtn />
          </div>
          <q-separator />

          <div class="bg-dark">
            <BotTree
              v-model:selected="selected"
              @update:bot="onUpdateBot"
              @update:data="onUpdateData"
            />
          </div>

          <div class="absolute-bottom bg-dark">
            <q-separator />
            <EmailBtn />
          </div>
        </div>
      </template>
      <template #after>
        <HomePage
          v-if="bot === undefined && data === undefined"
          @update:bot="
            (b) => {
              bot = b;
              selected = b.Type;
            }
          "
        />
        <BotPage v-else-if="bot !== undefined && data === undefined" :bot="bot" />
        <SitemapPage
          v-else-if="(data as Sitemap).Bot.Type === BotType.Sitemap"
          :data="data as Sitemap"
        />
        <NewsPage
          v-else-if="(data as BotTable).Bot.Type === BotType.News"
          :table="data as BotTable"
        />
        <SearchPage
          v-else-if="(data as BotTable).Bot.Type === BotType.Search"
          :data="data as Search"
        />
      </template>
    </q-splitter>
  </q-page>
</template>
