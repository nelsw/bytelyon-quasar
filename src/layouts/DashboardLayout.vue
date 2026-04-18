<script lang="ts" setup>
import NewsBotExpansionItem from 'components/expansion-item/NewsBotExpansionItem.vue';
import SearchBotExpansionItem from 'components/expansion-item/SearchBotExpansionItem.vue';
import SitemapBotExpansionItem from 'components/expansion-item/SitemapBotExpansionItem.vue';
import ScrollArea from 'components/scroll-area/ScrollArea.vue';
import LogoAvatar from 'components/avatar/LogoAvatar.vue';
import { useLayoutStore } from 'stores/layout-store';
import MenuBtn from 'components/btn/MenuBtn.vue';
import LogoutBtn from 'components/btn/LogoutBtn.vue';
import { computed } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const $store = useLayoutStore();

const menuVisible = computed(() => $q.screen.width <= 500);
</script>
<template>
  <q-layout @resize="console.log" view="hHh lpR lFr">
    <q-header class="bg-dark" bordered>
      <q-toolbar class="flex row justify-between items-center">
        <div v-show="menuVisible" class="flex flex-col col-grow items-start q-mr-sm">
          <MenuBtn />
        </div>
        <div class="flex flex-col col-grow items-center">
          <LogoAvatar random />
          <q-toolbar-title class="text-grey-5 text-weight-medium">ByteLyon</q-toolbar-title>
        </div>
        <div class="flex flex-col items-end">
          <LogoutBtn />
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
          <NewsBotExpansionItem />
          <SearchBotExpansionItem />
          <SitemapBotExpansionItem />
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
