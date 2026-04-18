<script lang="ts" setup>
import ScrollArea from 'components/scroll-area/ScrollArea.vue';
import LogoAvatar from 'components/avatar/LogoAvatar.vue';
import { useLayoutStore } from 'stores/layout-store';
import MenuBtn from 'components/btn/MenuBtn.vue';
import NewBotBtn from 'components/btn/NewBotBtn.vue';
import BotExpansionItem from 'components/expansion-item/BotExpansionItem.vue';
import { BotType } from 'src/types/model';

const $store = useLayoutStore();
</script>
<template>
  <q-layout @resize="console.log" view="hHh lpR lFr">
    <q-header class="bg-dark" bordered>
      <q-toolbar class="flex row justify-between items-center">
        <div class="flex flex-col col-grow items-start q-mr-sm">
          <MenuBtn />
        </div>
        <div class="flex flex-col col-grow items-center">
          <LogoAvatar random />
          <q-toolbar-title class="text-h5 text-grey-5 text-weight-medium">ByteLyon</q-toolbar-title>
        </div>
        <div class="flex flex-col items-end">
          <NewBotBtn />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="$store.leftDrawer"
      :breakpoint="500"
      :mini="$store.miniState"
      :width="350"
      side="left"
      bordered
      show-if-above
    >
      <ScrollArea style="height: 100%">
        <q-list separator>
          <BotExpansionItem :bot-type="BotType.News" />
          <BotExpansionItem :bot-type="BotType.Search" />
          <BotExpansionItem :bot-type="BotType.Sitemap" />
          <q-separator />
        </q-list>
      </ScrollArea>
    </q-drawer>
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
