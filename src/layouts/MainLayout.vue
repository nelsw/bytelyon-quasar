<script lang="ts" setup>
import HeaderBtnGroup from 'components/btn/group/HeaderBtnGroup.vue';
import { useTokenStore } from 'stores/token-store';
const $token = useTokenStore();
</script>
<template>
  <q-layout view="lHh lpR lFr">
    <q-header v-if="$token.IsValid()" class="bg-dark">
      <HeaderBtnGroup />
    </q-header>
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
