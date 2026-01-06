<script setup lang="ts">
import { ref } from 'vue';
import TreeFilter from 'components/input/TreeFilter.vue';
import BotTree from 'components/tree/BotTree.vue';
import PlusBtn from 'components/btn/PlusBtn.vue';

const filter = ref<string>('');
const selected = ref<string>('');
</script>

<template>

  <div class="flex justify-between items-center q-mx-sm">
    <TreeFilter v-model="filter" />
    <PlusBtn />
  </div>
  <q-separator />
  <q-scroll-area class="bg-dark fit">
    <BotTree v-model:selected="selected" :filter="filter" />
  </q-scroll-area>
</template>
