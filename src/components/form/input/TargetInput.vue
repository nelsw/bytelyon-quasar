<script setup lang="ts">
import { BotEnum } from 'src/types/base';
import { computed } from 'vue';

const props = defineProps<{
  botType: BotEnum;
  color: string;
  disable: boolean;
}>();

const model = defineModel<string>();

const label = computed(() => {
  if (props.botType === BotEnum.Articles) {
    return 'Topic';
  } else if (props.botType === BotEnum.Sitemaps) {
    return 'URL';
  } else {
    return 'Query';
  }
});

const hint = computed(() => {
  if (props.botType === BotEnum.Articles) {
    return 'Collect articles for this news Topic';
  } else if (props.botType === BotEnum.Sitemaps) {
    return 'Map all pages & links for this website URL';
  } else {
    return 'Scrape the SERP & result pages this search Query';
  }
});
</script>

<template>
  <q-input
    v-model="model"
    :autofocus="!disable"
    :color="color"
    :hint="hint"
    :label="label"
    :disable="disable"
    class="text-body1"
    dense
  >
    <template #prepend>
      <q-icon name="mdi-help-circle-outline" :color="color" />
    </template>
  </q-input>
</template>
