<script setup lang="ts">
import { type BotEnum, Bot, Bots, capitalize } from 'src/types/base';
import { computed } from 'vue';

const model = defineModel<string>('');
const color = computed(() => {
  if (model.value === undefined || model.value === '') {
    return undefined;
  }
  return Bot(model.value as BotEnum).color;
});
</script>

<template>
  <q-tabs v-model="model" class="text-grey-5" :indicator-color="color" shrink stretch inline-label>
    <q-tab
      v-for="b in Bots"
      :icon="b.icon"
      :key="b.type"
      :label="capitalize(b.type)"
      :name="b.type"
    />
  </q-tabs>
</template>
