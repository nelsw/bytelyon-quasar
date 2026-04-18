<script setup lang="ts">
import { computed } from 'vue';
import { type Bot, BotType } from 'src/types/model';

const model = defineModel<Bot>({ required: true });

const label = computed(() => {
  if (model.value.type === BotType.News) {
    return 'Topic';
  } else if (model.value.type === BotType.Sitemap) {
    return 'Domain';
  } else {
    return 'Query';
  }
});

const hint = computed(() => {
  if (model.value.type === BotType.News) {
    return 'Collect articles for this topic (e.g. btc forecast)';
  } else if (model.value.type === BotType.Sitemap) {
    return 'Map all pages & links for this domain (e.g. publix.com)';
  } else {
    return 'Scrape the SERP & result pages this query';
  }
});
</script>

<template>
  <q-input
    v-model="model.target"
    :autofocus="model.id === ''"
    :color="model.id === '' ? 'green-13' : 'amber-13'"
    :disable="model.id !== ''"
    :hint="hint"
    :label="label"
    class="text-body1"
  >
    <template #prepend>
      <q-icon name="mdi-help-circle-outline" :color="model.id === '' ? 'green-13' : 'amber-13'" />
    </template>
  </q-input>
</template>
