<script setup lang="ts">
import type { Bot } from 'src/types/base';
import { Articles, Sitemaps } from 'src/types/base';
import { computed } from 'vue';

const props = defineProps<{
  bot: Bot;
  color: string;
  autofocus?: boolean | undefined;
}>();

const model = defineModel<string>();

const label = computed(() => {
  if (props.bot.type === Articles.type) {
    return 'Topic';
  } else if (props.bot.type === Sitemaps.type) {
    return 'URL';
  } else {
    return 'Query';
  }
});

const hint = computed(() => {
  if (props.bot.type === Articles.type) {
    return 'Collect articles for this news Topic';
  } else if (props.bot.type === Sitemaps.type) {
    return 'Map all pages & links for this website URL';
  } else {
    return 'Scrape the SERP & result pages this search Query';
  }
});
</script>

<template>
  <q-input
    v-model="model"
    :color="color"
    :label="label"
    :hint="hint"
    :autofocus="autofocus"
    class="text-body1"
    dense
  >
    <template #prepend>
      <q-icon name="mdi-help-circle-outline" :color="color" />
    </template>
  </q-input>
</template>
