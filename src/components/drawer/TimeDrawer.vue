<script setup lang="ts">
import { SearchColor } from 'src/types/base';

const model = defineModel<boolean>({ required: true });
</script>

<template>
  <q-drawer v-model="model" side="right" bordered :width="188" :breakpoint="600">
    <q-scroll-area style="height: 100%">
      <q-list separator dense class="text-right">
        <q-item clickable v-ripple active :active-class="`text-${SearchColor}`">
          <q-item-section > 12/16/2026, 14:12:54 AM </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section> {{ new Date().toLocaleString() }} </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section > {{ new Date().toLocaleString() }} </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section > {{ new Date().toLocaleString() }} </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section > {{ new Date().toLocaleString() }} </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section > {{ new Date().toLocaleString() }} </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
