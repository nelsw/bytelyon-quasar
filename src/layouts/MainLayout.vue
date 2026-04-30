<script lang="ts" setup>
import HeaderBtnGroup from 'components/btn/group/HeaderBtnGroup.vue';
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
