<script setup lang="ts">
import { ref } from 'vue';
import BotTree from 'components/tree/BotTree.vue';
import type { Bot, BotTable } from 'src/types/model';
import LogoImg from 'components/img/LogoImg.vue';
import FilterInput from 'components/input/FilterInput.vue';
import RefreshBtn from 'components/btn/RefreshBtn.vue';
import EmailBtn from 'components/btn/EmailBtn.vue';
import LogoutBtn from 'components/btn/LogoutBtn.vue';
import SettingsBtn from 'components/btn/SettingsBtn.vue';

const leftDrawerOpen = ref<boolean>(true);
const rightDrawerOpen = ref<boolean>(false);
const selected = ref<string>('');
const bot = ref<Bot>();
const data = ref<BotTable<unknown>>();
const filter = defineModel<string>('filter', { default: '' });

const onLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
const onRightDrawer = () => (rightDrawerOpen.value = !rightDrawerOpen.value);
const onUpdateBot = (b: Bot) => {
  bot.value = b;
  data.value = undefined;
};
const onUpdateData = (d: BotTable<unknown>) => {
  bot.value = undefined;
  data.value = d;
};
</script>

<template>
  <q-layout view="hHh lpR lFr">
    <q-header reveal bordered class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="flex q-gutter-md no-pointer-events">
            <q-avatar>
              <LogoImg random />
            </q-avatar>
            <span class="text-h5 text-grey-5 text-weight-medium">ByteLyon</span>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :width="300" :breakpoint="400" side="left" bordered>
      <q-scroll-area style="height: calc(100% - 40px); margin-top: 40px">
        <BotTree
          v-model:selected="selected"
          v-model:filter="filter"
          @update:bot="onUpdateBot"
          @update:data="onUpdateData"
        />
      </q-scroll-area>
      <div class="absolute-top">
        <FilterInput v-model="filter" class="q-pt-xs q-px-md" />
        <q-separator inset />
      </div>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>

    <q-footer reveal bordered class="bg-dark text-white">
      <q-toolbar>
        <q-btn-group push spread flat square>
          <q-btn dense flat round icon="mdi-menu" @click="onLeftDrawer" />
          <LogoutBtn />
          <EmailBtn />
          <SettingsBtn />
          <RefreshBtn />
          <q-btn dense flat round icon="mdi-menu" @click="onRightDrawer" />
        </q-btn-group>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style scoped lang="scss"></style>
