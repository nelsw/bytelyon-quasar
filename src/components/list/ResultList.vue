<script setup lang="ts">
import { SearchColor } from 'src/types/base';
</script>

<template>
  <q-list separator dense class="text-left" style="width: 188px">
    <q-item clickable v-ripple active :active-class="`text-${SearchColor}`">
      <q-item-section> 12/16/2026, 14:12:54 AM </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section> {{ new Date().toLocaleString() }} </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section> {{ new Date().toLocaleString() }} </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section> {{ new Date().toLocaleString() }} </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section> {{ new Date().toLocaleString() }} </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section> {{ new Date().toLocaleString() }} </q-item-section>
    </q-item>
  </q-list>
</template>

<style scoped lang="scss"></style>
