<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  title: string;
  heading?: string;
  copy?: boolean;
  // persistent will not close on escape
  persistent?: boolean;
  // strict hides minimize & maximize buttons
  strict?: boolean;
}>();

const emit = defineEmits<{
  copy: [void];
  close: [void];
}>();

const model = defineModel<boolean>({ required: true });
const maximized = ref<boolean>(true);
</script>

<template>
  <q-dialog
    v-model="model"
    :maximized="maximized"
    :persistent="persistent"
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="1000"
  >
    <q-card class="bg-dark text-white" style="min-width: 350px">
      <q-bar class="flex justify-between">
        <q-btn
          v-if="copy"
          icon="mdi-content-copy"
          label="Copy json"
          @click="emit('copy')"
          dense
          flat
        />
        <div class="text-h5" v-html="title" />
        <div v-if="!strict">
          <q-btn
            dense
            flat
            icon="mdi-window-minimize"
            @click="maximized = false"
            :disable="!maximized"
          />
          <q-btn
            dense
            flat
            icon="mdi-window-maximize"
            @click="maximized = true"
            :disable="maximized"
          />
          <q-btn dense flat icon="mdi-close" @click="model = false" />
        </div>
      </q-bar>

      <q-card-section v-if="heading">
        <div class="text-h6" v-html="heading" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <slot name="content" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
