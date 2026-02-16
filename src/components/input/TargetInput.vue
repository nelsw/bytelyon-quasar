<script setup lang="ts">
import { computed } from 'vue';
import { BotType } from 'src/types/model';

const props = defineProps<{
  botType: BotType;
  color: string;
  disable: boolean;
}>();

const model = defineModel<string>();

const label = computed(() => {
  if (props.botType === BotType.News) {
    return 'Topic';
  } else if (props.botType === BotType.Sitemap) {
    return 'URL';
  } else {
    return 'Query';
  }
});

const hint = computed(() => {
  if (props.botType === BotType.News) {
    return 'Collect articles for this news Topic';
  } else if (props.botType === BotType.Sitemap) {
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
    :disable="disable"
    :hint="hint"
    :label="label"
    :prefix="label === 'URL' && !disable ? 'https://' : ''"
    class="text-body1"
    dense
  >
    <template #prepend>
      <q-icon name="mdi-help-circle-outline" :color="color" />
    </template>
  </q-input>
</template>
