<script setup lang="ts">
import { ref } from 'vue';
import TreeFilter from 'components/input/TreeFilter.vue';
import BotTree from 'components/tree/BotTree.vue';

const model = defineModel<boolean>({ required: true });

const filter = ref<string>('');
</script>

<template>
  <q-drawer v-model="model" side="left" show-if-above bordered :width="600" :breakpoint="600">
    <q-scroll-area
      style="height: calc(100% - 40px); margin-top: 40px;">
      <BotTree  :filter="filter" />
    </q-scroll-area>

    <div class="absolute-top" style="height: 40px">
      <div class=" q-mx-sm">
        <TreeFilter v-model="filter" />

      </div>
      <q-separator />
    </div>
  </q-drawer>
</template>
