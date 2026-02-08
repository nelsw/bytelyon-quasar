<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import DrawerBtn from 'components/btn/DrawerBtn.vue';
import SettingsBtn from 'components/btn/SettingsBtn.vue';
import LogoBtn from 'components/btn/LogoBtn.vue';
import ToolbarTabs from 'components/tabs/ToolbarTabs.vue';
import { useBotStore } from 'stores/v2/bot-store';
import JobDrawer from 'components/drawer/JobDrawer.vue';
import TimeDrawer from 'components/drawer/TimeDrawer.vue';
import { useRouteX } from 'src/composable/useRoutex';
import type { Bot, Bots, BotType } from 'src/types/model';

const bots = ref<Bot[]>([]);
const timeDrawerModel = ref(false);
const jobDrawerModel = ref(false);
const timeDrawerVisible = ref(false);
const jobDrawerVisible = ref(false);

const $store = useBotStore();
const $x = useRouteX();

const handleBotDrawer = (val: string | BotType) => {
  bots.value = $store.Find(val as BotType) as Bots;
  jobDrawerModel.value = bots.value.length > 0;
};

watch($x.botParam, handleBotDrawer);
onMounted(async () => {
  await $store.Load();
  handleBotDrawer($x.botType())
});
</script>

<template>
  <q-layout view="hHh lpR lFr">
    <JobDrawer v-model="jobDrawerModel" :bots="bots" />
    <TimeDrawer v-model="timeDrawerModel" />
    <q-header class="bg-dark" bordered>
      <q-toolbar class="bg-dark">
        <LogoBtn random class="q-mr-sm" @click="$x.toName('index')" />
        <q-separator vertical />
        <q-space />
        <ToolbarTabs />
        <q-space />
        <q-separator vertical />
        <SettingsBtn class="q-ml-sm" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <router-view />
        <DrawerBtn v-if="jobDrawerVisible" side="left" v-model="jobDrawerModel" />
        <DrawerBtn v-if="timeDrawerVisible" side="right" v-model="timeDrawerModel" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<style lang="scss">
.q-separator--dark {
  background-color: rgb(255, 255, 255, 0.12);
}
.q-header.bg-dark,
.q-drawer--left.q-drawer--bordered,
.q-drawer--right.q-drawer--bordered,
body.body--dark.q-drawer {
  border-color: rgb(255, 255, 255, 0.12) !important;
}
.q-icon.q-btn-dropdown__arrow.q-btn-dropdown__arrow-container {
  display: none;
}
</style>
