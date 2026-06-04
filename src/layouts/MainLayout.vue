<script lang="ts" setup>
import HeaderBtnGroup from '../components/btn/HeaderBtnGroup.vue';
import { useBotStore } from 'src/stores/bots';
import { onMounted } from 'vue';
import LogoAvatar from 'components/avatar/LogoAvatar.vue';
import ProfileBtn from '../components/btn/ProfileBtn.vue';
onMounted(useBotStore().fetch);
</script>
<template>
  <q-layout view="lHh lpR lFr">
    <q-header class="bg-dark">
      <q-toolbar class="row items-center">
        <LogoAvatar class="q-mt-xs" size="md" random />
        <q-space />
        <HeaderBtnGroup class="col-4" />
        <q-space />
        <ProfileBtn />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
