<script setup lang="ts">
import LogoImg from 'components/img/LogoImg.vue';
import { computed, ref } from 'vue';
import HeaderBreadCrumbs from 'components/breadcrumbs/HeaderBreadCrumbs.vue';
import LeftDrawer from 'components/drawer/LeftDrawer.vue';
import MenuBtn from 'components/btn/MenuBtn.vue';
import RightDrawer from 'components/drawer/RightDrawer.vue';
import { useRouter } from 'vue-router';

const drawerLeft = ref<boolean>(true);
const drawerRight = computed(() => {
  let s = $r.currentRoute.value.params.date;
  if (s !== undefined && s !== null && s!=='') return false;
  s = $r.currentRoute.value.name?.toString();
  return s === 'news' || s === 'sitemap' || s === 'search';
});

const $r = useRouter();
</script>

<template>
  <q-layout view="hHh lpR lFr">
    <LeftDrawer v-model="drawerLeft" />
    <RightDrawer
      v-model="drawerRight"
      :type="$r.currentRoute.value.name as string"
      :id="$r.currentRoute.value.params.id as string"
      :date="$r.currentRoute.value.params.date as string"
    />
    <q-header class="bg-dark" bordered>
      <q-toolbar class="bg-dark">
        <div class="row full-width">
          <div class="col-3 flex items-center">
            <q-btn dense flat :to="{ name: 'Dashboard' }" color="dark" size="md" round>
            <q-avatar size="md">
              <LogoImg />
            </q-avatar>
            </q-btn>
            <div class="text-white text-subtitle1 q-ml-sm">ByteLyon</div>
            <q-separator vertical spaced inset />
            <MenuBtn v-model="drawerLeft" />
          </div>
          <div class="col-6 flex justify-center items-center">
            <HeaderBreadCrumbs />
          </div>
          <div class="col-3 flex justify-end items-center">
            <q-separator vertical spaced inset />
            <q-btn dense flat :to="{ name: 'account' }" color="dark" size="md" round>
              <q-avatar size="md">
                <img src="https://avatars.githubusercontent.com/u/7100798?v=4" alt="User Avatar" />
              </q-avatar>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
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
