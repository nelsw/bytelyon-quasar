<script setup lang="ts">
import HeaderBreadCrumbs from 'components/breadcrumbs/HeaderBreadCrumbs.vue';
import LogoImg from 'components/img/LogoImg.vue';
</script>

<template>
  <q-layout view="lHh LpR lFr">
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
