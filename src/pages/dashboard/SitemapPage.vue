<script setup lang="ts">
import { ref } from 'vue';
import XSplitter from 'components/splitter/XSplitter.vue';
import BotTree from 'components/tree/BotTree.vue';

defineProps<{
  id?: string;
  date?: string;
}>();
const model = ref(50);
</script>

<template>
  <x-splitter v-model="model">
    <template v-slot:before>
      <div class="q-pa-md">
        <div class="text-h4 q-mb-md">Before</div>
<BotTree />
      </div>
    </template>

    <template v-slot:after>
      <div class="q-pa-md">
        <div class="text-h4 q-mb-md">After</div>
        <div v-for="n in 20" :key="n" class="q-my-md">
          {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
          magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda
          consectetur culpa fuga nulla ullam. In, libero.
        </div>
      </div>
    </template>
  </x-splitter>
</template>
