<script setup lang="ts">
import LogoImg from 'components/img/LogoImg.vue';
import { ref } from 'vue';
import BotTree from 'components/tree/BotTree.vue';
import HeaderBreadCrumbs from 'components/breadcrumbs/HeaderBreadCrumbs.vue';
import MenuBtn from 'components/btn/MenuBtn.vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import SearchInput from 'components/input/SearchInput.vue';
import RightDrawer from 'components/drawer/RightDrawer.vue';

const drawerLeft = ref<boolean>(true);
const selected = ref<string>('');
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
        <BotTree v-model:selected="selected" />
      </q-scroll-area>
    </q-drawer>
    <RightDrawer v-model="selected" />
    <q-header class="bg-dark" bordered>
      <q-bar class="bg-dark text-white" dark style="padding: 0 6px">
        <div class="flex row items-center q-mr-xs">
          <div class="flex items-center">
            <q-avatar size="sm">
              <LogoImg random />
            </q-avatar>
            <div class="text-weight-regular q-ml-sm">ByteLyon</div>
          </div>
        </div>
        <div v-if="drawerLeft" style="min-width: 138px" />
        <MenuBtn v-model="drawerLeft" />
        <q-separator vertical spaced />
        <HeaderBreadCrumbs />
        <q-space />
        <TrashBtn />
        <q-separator vertical spaced />
        <SearchInput />
      </q-bar>
    </q-header>
    <q-page-container>
      <q-page>
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
</style>
