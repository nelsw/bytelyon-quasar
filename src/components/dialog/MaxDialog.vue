<script setup lang="ts">
import { ref } from 'vue';

const model = defineModel<boolean>({ default: false });
const maxed = ref<boolean>(false);
</script>

<template>
  <q-dialog
    v-model="model"
    persistent
    :maximized="maxed"
    transition-show="slide-up"
    transition-hide="slide-down"
    :full-width="maxed"
  >
    <q-card class="my-card text-white" style="width: 700px; max-width: 80vw;">
      <q-bar>
        <slot name="title" />

        <q-space />

        <q-btn
          dense
          flat
          icon="mdi-window-minimize"
          @click="maxed = false"
          :disable="!maxed"
        />
        <q-btn
          dense
          flat
          icon="mdi-window-maximize"
          @click="maxed = true"
          :disable="maxed"
        />
        <q-btn dense flat icon="mdi-close" v-close-popup />
      </q-bar>

      <q-card-section>
        <slot name="content" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

