<script setup lang="ts">
import BotTree from 'components/tree/BotTree.vue';

const model = defineModel<boolean>({ required: true });
</script>

<template>
  <q-drawer v-model="model" side="left" show-if-above bordered :width="225" :breakpoint="500">
    <q-scroll-area class="fit">
      <BotTree />
      <div class="absolute-bottom">
        <q-separator />
        <q-btn class="full-width" no-caps :ripple="false" @click="model = false" dense>
          <div class="flex justify-center">
            <q-icon name="mdi-menu-open" color="grey" />
            <div class="text-grey">Collapse</div>
          </div>
        </q-btn>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>
