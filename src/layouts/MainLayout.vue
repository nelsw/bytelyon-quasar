<script lang="ts" setup>
import HeaderBtnGroup from 'components/btn/group/HeaderBtnGroup.vue';
import { useBots } from 'stores/bots';
import { onMounted } from 'vue';
onMounted(useBots().LoadAll)
</script>
<template>
  <q-layout view="lHh lpR lFr">
    <q-header class="bg-dark">
      <HeaderBtnGroup />
    </q-header>
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
