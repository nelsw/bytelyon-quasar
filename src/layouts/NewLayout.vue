<script setup lang="ts">
import { ref } from 'vue';
import { NewsIcon, SearchIcon, SitemapIcon } from 'src/types/base';

const drawer = ref<boolean>(true);
const miniState = ref<boolean>(true);

const drawerClick = (e: Event) => {
  // if in "mini" state and user
  // click on drawer, we switch it to "normal" mode
  if (miniState.value) {
    miniState.value = false;

    // notice we have registered an event with capture flag;
    // we need to stop further propagation as this click is
    // intended for switching drawer to "normal" mode only
    e.stopPropagation();
  }
};
</script>

<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header class="bg-dark" bordered>
      <q-toolbar class="bg-dark">
        <q-btn flat @click="drawer = !drawer" round dense icon="mdi-menu" />
        <q-toolbar-title>Header</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-dark"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon :name="SearchIcon" />
            </q-item-section>

            <q-item-section> Search </q-item-section>
          </q-item>

          <q-item  clickable v-ripple>
            <q-item-section avatar>
              <q-icon :name="NewsIcon" />
            </q-item-section>

            <q-item-section> News </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon :name="SitemapIcon" />
            </q-item-section>

            <q-item-section> Sitemap </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="mdi-drafts" />
            </q-item-section>

            <q-item-section> Drafts </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <!--
        in this case, we use a button (can be anything)
        so that user can switch back
        to mini-mode
      -->
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>

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
