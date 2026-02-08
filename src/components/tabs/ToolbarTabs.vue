<script setup lang="ts">
import { capitalize } from 'src/types/base';
import { BotTypeIcon, BotTypes } from 'src/types/model';
import { ref, watch } from 'vue';
import { useRouteX } from 'src/composable/useRoutex';

const $x = useRouteX();

const model = ref<string>($x.botParam());

watch(model, async (val: string) => await $x.to({name: 'bot', params: {bot: val}}));
watch($x.botParam, (val: string) => {
  if (val === undefined) {
    model.value = '';
  } else if (val !== model.value) {
    model.value = val;
  }
});
</script>

<template>
  <q-tabs v-model="model" class="text-grey-5" indicator-color="primary" shrink stretch inline-label>
    <q-tab v-for="b in BotTypes" :icon="BotTypeIcon(b)" :key="b" :label="capitalize(b)" :name="b" />
  </q-tabs>
</template>
