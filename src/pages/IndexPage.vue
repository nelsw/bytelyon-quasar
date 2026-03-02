<script setup lang="ts">
import { ref } from 'vue';
import LogoBtn from 'components/btn/LogoBtn.vue';
import BotTree from 'components/tree/BotTree.vue';
import HomePage from 'pages/HomePage.vue';
import BotPage from 'pages/BotPage.vue';
import type { Bot, NewsBotData, SearchBotData, SitemapBotData } from 'src/types/model';
import RefreshBtn from 'components/btn/RefreshBtn.vue';
import EmailBtn from 'components/btn/EmailBtn.vue';
import LogoutBtn from 'components/btn/LogoutBtn.vue';
import SettingsBtn from 'components/btn/SettingsBtn.vue';

const splitterModel = ref(350);
const selected = ref<string>('');
const bot = ref<Bot>();
const data = ref<SearchBotData | SitemapBotData | NewsBotData>();

const onUpdateBot = (b: Bot) => {
  bot.value = b;
  data.value = undefined;
};
// const onUpdateData = (d: SearchBotData | SitemapBotData | NewsBotData) => {
//   bot.value = undefined;
//   data.value = d;
// };
const onUpdated = (b: Bot) => {
  bot.value = b;
  selected.value = b.type;
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
        <!--        <SitemapPage-->
        <!--          v-else-if="(data as BotTable).Bot.type === BotType.Sitemap"-->
        <!--          :data="data as BotTable"-->
        <!--        />-->
        <!--        <NewsPage-->
        <!--          v-else-if="(data as BotTable).Bot.type === BotType.News"-->
        <!--          v-model="data as BotTable"-->
        <!--        />-->
        <!--        <SearchPage-->
        <!--          v-else-if="(data as BotTable).Bot.type === BotType.Search"-->
        <!--          :data="data as BotTable"-->
        <!--        />-->
      </template>
    </q-splitter>
  </q-page>
</template>
