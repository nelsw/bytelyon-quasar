<script lang="ts" setup>
import ScrollArea from 'components/scroll-area/ScrollArea.vue';
import LogoAvatar from 'components/avatar/LogoAvatar.vue';
import { useLayoutStore } from 'stores/layout-store';
import MenuBtn from 'components/btn/MenuBtn.vue';
import NewBotBtn from 'components/btn/NewBotBtn.vue';
import BotExpansionItem from 'components/expansion-item/BotExpansionItem.vue';
import { BotType } from 'src/types/model';
import { onMounted } from 'vue';
import { useBotStore } from 'stores/bot-store';
import DashboardFooter from 'components/footer/DashboardFooter.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const $layout = useLayoutStore();
const $bots = useBotStore();
onMounted($bots.loadAll);
</script>
<template>
  <q-layout @resize="console.log" view="lHh lpR lFr">
    <q-header class="bg-dark" style="height:49px;" bordered>
      <q-toolbar class="flex row">
        <MenuBtn />
        <q-space />
        <div class="flex flex-col items-center">
          <LogoAvatar random width="20%"/>
          <q-toolbar-title v-if="$q.screen.gt.sm" class="text-h5 text-grey-5 text-weight-medium"
          >ByteLyon
          </q-toolbar-title
          >
        </div>
        <q-space />
        <NewBotBtn />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="$layout.leftDrawer"
      :breakpoint="500"
      :mini="$layout.miniState"
      :width="300"
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
    <DashboardFooter />
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
