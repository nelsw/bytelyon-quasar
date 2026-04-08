<script lang="ts" setup>
import { ref } from 'vue';
import LogoImg from 'components/img/LogoImg.vue';
import { useNodeStore } from 'stores/node-store';
import NewsBotExpansionItem from 'components/expansion-item/NewsBotExpansionItem.vue';
import SearchBotExpansionItem from 'components/expansion-item/SearchBotExpansionItem.vue';
import SitemapBotExpansionItem from 'components/expansion-item/SitemapBotExpansionItem.vue';

const $nodeStore = useNodeStore();

const miniState = ref<boolean>(false);
const leftDrawer = ref<boolean>(true);
const rightDrawer = ref<boolean>(false);
</script>
<template>
  <q-layout view="hHh lpR lFr">
    <q-drawer
      v-model="leftDrawer"
      :breakpoint="500"
      :mini="miniState"
      :width="350"
      side="left"
      bordered
      show-if-above
    >
      <q-scroll-area style="height: calc(100% - 49px); margin-top: 49px">
        <q-list separator>
          <NewsBotExpansionItem />
          <SearchBotExpansionItem />
          <SitemapBotExpansionItem />
          <q-separator />
        </q-list>
      </q-scroll-area>
      <div class="absolute-top" style="height: 49px">
        <q-item>
          <q-item-section avatar style="min-width: 25px; padding-right: 0">
            <LogoImg width="25px" />
          </q-item-section>
          <q-item-section style="margin-left: 12px">
            <span class="text-h5 text-grey-5 text-weight-medium"> ByteLyon </span>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
    </q-drawer>

    <q-drawer v-model="rightDrawer" side="right" :width="1250" bordered>
      <pre>{{ $nodeStore.model }}</pre>
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
