<script setup lang="ts">

const model = defineModel<boolean>({ default: false });
</script>

<template>
  <q-dialog
    v-model="model"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
    full-width
  >
    <q-card class="my-card text-white" style="width: 700px; max-width: 80vw">
      <q-bar>
        <slot name="title" />

        <q-space />

        <q-btn dense flat icon="mdi-close" v-close-popup />
      </q-bar>

      <q-card-section class="scroll" style="max-height: 90vh">
        <slot name="content" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
