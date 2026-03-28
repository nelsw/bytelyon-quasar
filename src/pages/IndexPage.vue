<script setup lang="ts">
import { ref } from 'vue';
import LogoBtn from 'components/btn/LogoBtn.vue';
import BotTree from 'components/tree/BotTree.vue';
import HomePage from 'pages/HomePage.vue';
import BotPage from 'pages/BotPage.vue';
import type { BotNode } from 'src/types/model';
import { BotType } from 'src/types/model';
import EmailBtn from 'components/btn/EmailBtn.vue';
import LogoutBtn from 'components/btn/LogoutBtn.vue';
import SettingsBtn from 'components/btn/SettingsBtn.vue';
import NewsPage from 'pages/NewsPage.vue';
import SitemapPage from 'pages/SitemapPage.vue';
import SearchPage from 'pages/SearchPage.vue';

const splitterModel = ref(350);
const selected = ref<string>('');
const bot = ref<BotNode>();
const data = ref<BotNode>();

const onUpdateBot = (b: BotNode) => {
  bot.value = b;
  data.value = undefined;
  selected.value = b.id.toString();
};
const onUpdateData = (b: BotNode) => {
  // bot.value = undefined;
  data.value = b;
  // selected.value = b.id.toString();
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
              <LogoutBtn />
              <EmailBtn />
              <SettingsBtn />
            </q-btn-group>
          </div>
        </div>
      </template>
      <template #after>
        <HomePage v-if="bot === undefined && data === undefined" @update:bot="onUpdateBot" />
        <BotPage
          v-else-if="bot?.botId === ''"
          :bot="bot"
          @deleted="onDeleted"
        />
        <SitemapPage v-else-if="data?.type === BotType.Sitemap" :node="data" />
        <NewsPage v-else-if="data?.type === BotType.News" v-model="data" />
        <SearchPage v-else-if="data?.type === BotType.Search" :node="data" />
      </template>
    </q-splitter>
  </q-page>
</template>
