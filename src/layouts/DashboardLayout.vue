<script setup lang="ts">
import LogoImg from 'components/img/LogoImg.vue';
import { ref } from 'vue';
import HeaderBreadCrumbs from 'components/breadcrumbs/HeaderBreadCrumbs.vue';
import DashboardFooter from 'components/footer/DashboardFooter.vue';
import LeftDrawer from 'components/drawer/LeftDrawer.vue';

const drawerLeft = ref<boolean>(true);
</script>

<template>
  <q-layout view="hHh lpR lFr">
    <q-drawer
      v-model="drawerLeft"
      side="left"
      show-if-above
      bordered
      :width="300"
      :breakpoint="600"
    >
      <LeftDrawer />
    </q-drawer>
    <q-header class="bg-dark" bordered>
      <q-toolbar class="bg-dark">
        <q-avatar size="md">
          <LogoImg />
        </q-avatar>

        <q-separator vertical spaced inset />

        <q-space />
        <HeaderBreadCrumbs />
        <q-space />

        <q-separator vertical spaced inset />
        <q-btn dense flat :to="{ name: 'account' }" color="dark" size="md">
          <q-avatar size="md">
            <img src="https://avatars.githubusercontent.com/u/7100798?v=4" alt="User Avatar" />
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>
    <DashboardFooter v-model:drawer-left="drawerLeft" />
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
