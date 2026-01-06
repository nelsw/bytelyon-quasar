<script setup lang="ts">
import LogoImg from 'components/img/LogoImg.vue';
import { ref } from 'vue';
import BotTree from 'components/tree/BotTree.vue';
import HeaderBreadCrumbs from 'components/breadcrumbs/HeaderBreadCrumbs.vue';
import MenuBtn from 'components/btn/MenuBtn.vue';
import RightDrawer from 'components/drawer/RightDrawer.vue';
import TreeFilter from 'components/input/TreeFilter.vue';
import PlusBtn from 'components/btn/PlusBtn.vue';

const drawerLeft = ref<boolean>(true);
const selected = ref<string>('');
const filter = ref<string>('');
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer
      v-model="drawerLeft"
      side="left"
      show-if-above
      bordered
      :width="300"
      :breakpoint="600"
    >
      <q-scroll-area class="fit">
        <TreeFilter v-model="filter" class="q-px-lg" />
        <q-separator inset />
        <BotTree v-model:selected="selected" :filter="filter" />
      </q-scroll-area>
    </q-drawer>
    <RightDrawer v-model="selected" />
    <q-header class="bg-dark" bordered>
      <q-toolbar class="bg-dark">
        <div class="flex row justify-center items-center q-mx-sm">
          <div class="flex items-center">
            <q-avatar size="md">
              <LogoImg />
            </q-avatar>
            <div class="text-subtitle1 q-ml-md">ByteLyon</div>
          </div>
        </div>
        <div v-if="drawerLeft" style="min-width: 110px" />

        <MenuBtn v-model="drawerLeft" />
        <q-separator vertical spaced inset />

        <q-space />
        <HeaderBreadCrumbs />
        <q-space />
        <PlusBtn />
        <q-separator vertical spaced inset />
        <q-btn dense flat :to="{ name: 'account' }" color="dark" size="md">
          <q-avatar size="md">
            <img src="https://avatars.githubusercontent.com/u/7100798?v=4" alt="User Avatar" />
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<style lang="scss">
.q-toolbar {
  padding: 0 8px !important;
}
.q-separator--dark {
  background-color: rgb(255, 255, 255, 0.12);
}
.q-header.bg-dark,
.q-drawer--left.q-drawer--bordered,
.q-drawer--right.q-drawer--bordered,
body.body--dark.q-drawer {
  border-color: rgb(255, 255, 255, 0.12) !important;
}
</style>
