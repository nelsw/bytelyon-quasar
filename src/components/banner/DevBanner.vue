<script setup lang="ts">
import { useBannerStore } from 'stores/banner-store';
const store = useBannerStore();

</script>

<template>
  <q-banner v-if="store.showDevBanner()" class="text-white bg-red text-right" dense inline-actions>
    You are in the local development environment.
    <template v-slot:action>
      <q-btn @click="store.hideDevBanner()" label="HIDE" outline />
    </template>
  </q-banner>
</template>
