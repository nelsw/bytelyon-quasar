<script setup lang="ts">
import XFabAction from 'components/fab/XFabAction.vue';
</script>

<template>
  <q-fab
    color="yellow-10"
    direction="up"
    square
    label="Result Files"
    text-color="grey-10"
    vertical-actions-align="right"
  >
    <template #icon="{ opened }">
      <q-icon :class="{ 'example-fab-animate--hover': opened !== true }" name="mdi-file-multiple" />
    </template>

    <template #active-icon="{ opened }">
      <q-icon :class="{ 'example-fab-animate': opened === true }" name="mdi-file-multiple" />
    </template>

    <x-fab-action color="yellow-9" icon="mdi-download" label="Download Source" />
    <x-fab-action color="yellow-8" icon="mdi-image" label="View Screenshot" />
    <x-fab-action color="yellow-7" icon="mdi-code-json" label="Copy JSON" />
  </q-fab>
</template>
