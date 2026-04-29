<script setup lang="ts">
import { computed } from 'vue';
import { BotType } from 'src/types/model';
import { useRoute } from 'vue-router';

defineProps<{
  color: string;
}>();

const $route = useRoute();

const model = defineModel<string>({ required: true });

const label = computed(() => {
  if ($route.params.botType === BotType.News) {
    return 'Topic';
  } else if ($route.params.botType === BotType.Sitemap) {
    return 'Domain';
  } else {
    return 'Query';
  }
});

const hint = computed(() => {
  if ($route.params.botType === BotType.News) {
    return 'Collect articles for this topic (e.g. btc forecast)';
  } else if ($route.params.botType === BotType.Sitemap) {
    return 'Map all pages & links for this domain (e.g. publix.com)';
  } else {
    return 'Scrape the SERP & result pages this query';
  }
});
</script>

<template>
  <q-input
    v-model="model"
    autofocus
    :color="color"
    :disable="color === 'amber-13'"
    :hint="hint"
    :label="label"
    class="text-body1"
    hide-bottom-space
    filled
    options-dense
    square
    dense
  >
    <template #prepend>
      <q-icon name="mdi-help-circle-outline" :color="color" />
    </template>
  </q-input>
</template>
