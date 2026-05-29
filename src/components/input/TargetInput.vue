<script setup lang="ts">
import { useRoute } from 'vue-router';

defineProps<{
  create?: boolean;
}>();

const $route = useRoute();
const model = defineModel<string>({ required: true });
</script>

<template>
  <q-input
    v-model="model"
    :color="create ? 'green-13' : 'amber-13'"
    :hint="
      $route.params.botType === 'news'
        ? 'Collect articles for this topic (e.g. btc forecast)'
        : $route.params.botType === 'search'
          ? 'Scrape the SERP & result pages this query'
          : 'Map all pages & links for this domain (e.g. publix.com)'
    "
    :label="
      $route.params.botType === 'news'
        ? 'Topic'
        : $route.params.botType === 'search'
          ? 'Query'
          : 'Domain'
    "
    :readonly="!create"
    class="text-body1"
    autofocus
    dense
    filled
    hide-bottom-space
    options-dense

  >
    <template #prepend>
      <q-icon name="mdi-help-circle-outline" :color="create ? 'green-13' : 'amber-13'" />
    </template>
  </q-input>
</template>
