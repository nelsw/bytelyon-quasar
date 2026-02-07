<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import DrawerBtn from 'components/btn/DrawerBtn.vue';
import SettingsBtn from 'components/btn/SettingsBtn.vue';
import LogoBtn from 'components/btn/LogoBtn.vue';
import ToolbarTabs from 'components/tabs/ToolbarTabs.vue';
import { useBotStore } from 'stores/v2/bot-store';
import { type BotEnum } from 'src/types/base';
import { useRouteHelper } from 'src/composable/routeHelper';
import JobDrawer from 'components/drawer/JobDrawer.vue';
import TimeDrawer from 'components/drawer/TimeDrawer.vue';
import { type Job } from 'src/types/model';
import { useRouter } from 'vue-router';

const timeDrawerModel = ref(false);
const jobDrawerModel = ref(false);
const timeDrawerVisible = ref(false);
const jobDrawerVisible = ref(false);

const tabModel = ref<string>('');

const jobs = ref<Job[]>([]);

const store = useBotStore();
const r = useRouteHelper();

const onUpdate = (s?: string) => {
  if (r.isIndex()) {
    jobDrawerModel.value = false;
    timeDrawerModel.value = false;
  }

  const e: BotEnum = s ? (s as BotEnum) : r.botType();

  const hasBots: boolean = store.hasBots(e);
  if (hasBots) {
    jobs.value = store.getBots(e);
  }
  jobDrawerVisible.value = hasBots;
  jobDrawerModel.value = hasBots;

  // todo - right drawer
};

const router = useRouter();
watch(tabModel, async () => {
  if (tabModel.value === '') {
    await router.push({ name: 'index' });
    onUpdate();
  } else {
    await router.push({ name: 'bot', params: { bot: tabModel.value } });
    onUpdate(tabModel.value);
  }
});

onMounted(async () => {
  await store.loadAll();
});
</script>

<template>
  <q-layout view="hHh lpR lFr">
    <JobDrawer v-model="jobDrawerModel" :jobs="jobs" :bot="r.bot()" />
    <TimeDrawer v-model="timeDrawerModel" />
    <q-header class="bg-dark" bordered>
      <q-toolbar class="bg-dark">
        <LogoBtn random class="q-mr-sm" @click="tabModel = ''" />
        <q-separator vertical />
        <q-space />
        <ToolbarTabs v-model="tabModel" />
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
