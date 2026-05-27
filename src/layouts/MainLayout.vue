<script lang="ts" setup>
import HeaderBtnGroup from 'components/btn/group/HeaderBtnGroup.vue';
import { useBotStore } from 'src/stores/bot-store';
import { onMounted } from 'vue';
import CarlFab from 'components/fab/CarlFab.vue';
onMounted(useBotStore().LoadAll)
</script>
<template>
  <q-layout view="lHh lpR lFr">
    <q-header class="bg-dark">
      <HeaderBtnGroup />
    </q-header>
    <q-page-container>
      <q-page>
        <router-view />
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <CarlFab />
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
