<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import DrawerBtn from 'components/btn/DrawerBtn.vue';
import SettingsBtn from 'components/btn/SettingsBtn.vue';
import LogoBtn from 'components/btn/LogoBtn.vue';
import { useBotStore } from 'stores/v2/bot-store';
import BotDrawer from 'components/drawer/BotDrawer.vue';
import ResultDrawer from 'components/drawer/ResultDrawer.vue';
import { useRouteX } from 'src/composable/useRoutex';
import type { Bots, Result, Results } from 'src/types/model';
import { BotType } from 'src/types/model';
import { useResultStore } from 'stores/v2/result-store';
import ToolbarTabs from 'components/tabs/ToolbarTabs.vue';

const $x = useRouteX();
const $store = useBotStore();
const $resultStore = useResultStore();

const bots = ref<Bots>([]);
const results = ref<Results>([]);
const jobDrawerModel = ref(false);
const jobDrawerVisible = ref(false);
const resultDrawerModel = ref(false);
const resultDrawerVisible = ref(false);
const toolbarTabModel = ref<string>('');

const handleBotDrawer = (val: string | BotType) => {
  if ((val === undefined || val === '') && $x.name()?.match(/^(search|sitemap|news)$/)) {
    val = $x.name();
  }
  bots.value = $store.Find(val as BotType) as Bots;
  jobDrawerVisible.value = bots.value.length > 0;
  jobDrawerModel.value = bots.value.length > 0;
};

const handleResultDrawer = async (n: number) => {

  if (($x.name() as BotType) === BotType.Sitemap && $x.id() > 0 && $x.resultParam() > 0) {
    results.value = await $resultStore.Find<Result>($x.name() as BotType, n);
    resultDrawerModel.value = results.value.length > 0;
    resultDrawerVisible.value = results.value.length > 0;
    return;
  }
  if ($x.botType() === undefined || $x.botType() === BotType.News || n === 0) {
    resultDrawerModel.value = false;
    resultDrawerVisible.value = false;
    return;
  }
  results.value = await $resultStore.Find<Result>($x.botType(), n);
  resultDrawerModel.value = results.value.length > 0;
  resultDrawerVisible.value = results.value.length > 0;
};

watch($x.botParam, handleBotDrawer);
watch($x.id, handleResultDrawer);
onMounted(async () => {
  await $store.Load();
  handleBotDrawer($x.botType());
  await handleResultDrawer($x.id());
});
</script>

<template>
  <q-layout view="hHh lpR lFr">
    <BotDrawer v-model="jobDrawerModel" :bots="bots" />
    <ResultDrawer v-model="resultDrawerModel" :results="results" />
    <q-header class="bg-dark" bordered>
      <q-toolbar class="bg-dark">
        <LogoBtn
          random
          @click="
            $x.toName('index');
            toolbarTabModel = '';
          "
        />
        <q-space />
        <ToolbarTabs v-model="toolbarTabModel" />
        <q-space />
        <SettingsBtn />
      </q-toolbar>
    </q-header>
    <q-footer class="my-footer bg-dark" bordered >
      <q-toolbar class="bg-dark">
        <DrawerBtn v-if="jobDrawerVisible" side="left" v-model="jobDrawerModel" />
        <q-space />
        <div class="text-grey text-subtitle1">ByteLyon</div>
        <q-space />
        <DrawerBtn v-if="resultDrawerVisible" side="right" v-model="resultDrawerModel" />
      </q-toolbar>
    </q-footer>
    <q-page-container>
      <q-page padding>
        <router-view />
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
.q-footer.bg-dark {
  border-color: #ffffff1e !important;
}
</style>
