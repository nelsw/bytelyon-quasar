<script lang="ts" setup>
import { ref } from 'vue';
import LogoImg from 'components/img/LogoImg.vue';
import NewsBotExpansionItem from 'components/expansion-item/NewsBotExpansionItem.vue';
import SearchBotExpansionItem from 'components/expansion-item/SearchBotExpansionItem.vue';
import SitemapBotExpansionItem from 'components/expansion-item/SitemapBotExpansionItem.vue';
import MenuIcon from 'components/icon/MenuIcon.vue';

const miniState = ref<boolean>(false);
const leftDrawer = ref<boolean>(true);
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
      <q-scroll-area style="height: calc(100% - 49px - 49px); margin-top: 49px">
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
            <LogoImg width="25px" random />
          </q-item-section>
          <q-item-section style="margin-left: 12px">
            <span class="text-h5 text-grey-5 text-weight-medium"> ByteLyon </span>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
      <div class="absolute-bottom" style="height: 49px">
        <q-separator />
        <q-item @click="miniState = !miniState" class="text-grey-8" clickable>
          <q-item-section avatar>
            <MenuIcon v-model="miniState" size="md" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Collapse
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-drawer>
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
