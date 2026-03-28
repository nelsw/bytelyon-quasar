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
const bot = ref<BotNode | undefined>();

const onUpdateBot = (b?: BotNode) => {
  console.debug('onUpdateBot', b);
  bot.value = b;
  selected.value = b?.id as string;
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
            <BotTree v-model:selected="selected" @update:bot="onUpdateBot" />
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
        <HomePage v-if="bot === undefined || bot?.id === ''" @update:bot="onUpdateBot" />
        <BotPage v-else-if="bot.rows === null" :bot="bot" @deleted="onDeleted" />
        <SitemapPage v-else-if="bot?.type === BotType.Sitemap" :node="bot" />
        <NewsPage v-else-if="bot?.type === BotType.News" v-model="bot" />
        <SearchPage v-else-if="bot?.type === BotType.Search" :node="bot" />
      </template>
    </q-splitter>
  </q-page>
</template>
