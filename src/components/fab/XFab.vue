<script setup lang="ts">
import XFabAction from 'components/fab/XFabAction.vue';
import { NewsIcon, SearchIcon, SitemapIcon } from 'src/types/base';
</script>

<template>
  <q-fab color="primary" direction="up" square label="New Bot">
    <template #icon="{ opened }">
      <q-icon :class="{ 'example-fab-animate--hover': opened !== true }" name="mdi-plus-thick" />
    </template>

    <template #active-icon="{ opened }">
      <q-icon :class="{ 'example-fab-animate': opened === true }" name="mdi-robot-love" />
    </template>

    <x-fab-action color="primary" :icon="SearchIcon" label="Search" />
    <x-fab-action color="primary" :icon="SitemapIcon" label="Sitemap" />
    <x-fab-action color="primary" :icon="NewsIcon" label="News" />
  </q-fab>
</template>
