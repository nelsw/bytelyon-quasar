<script lang="ts" setup>
import { ref } from 'vue';
import CollapseBtn from 'components/btn/CollapseBtn.vue';
import ShopifyBtn from 'components/btn/ShopifyBtn.vue';
import LogoImg from 'components/img/LogoImg.vue';
import { useNodeStore } from 'stores/node-store';

const $nodeStore = useNodeStore();

const leftDrawer = ref<boolean>(false);
const rightDrawer = ref<boolean>(false);
</script>
<template>
  <q-layout view="hHh lpR lFr">
    <q-header class="bg-dark text-white" bordered>
      <q-toolbar class="flex justify-between">
        <div class="flex">
          <CollapseBtn v-model="leftDrawer" side="left" />
          <LogoImg class="q-mx-sm" width="32px" />
          <div>
            <span class="text-h5 text-grey-5 text-weight-medium">ByteLyon</span>
          </div>
        </div>
        <div class="flex"></div>
        <div class="flex">
          <ShopifyBtn size="sm"/>
          <CollapseBtn v-model="rightDrawer" side="right" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawer" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer v-model="rightDrawer" side="right" :width="1250" bordered>
      <pre>{{$nodeStore.model}}</pre>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
