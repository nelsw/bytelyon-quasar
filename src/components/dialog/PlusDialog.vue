<script setup lang="ts">
import { type Bot, BotEnum } from 'src/types/base';
import NewsForm from 'components/form/NewsForm.vue';
import SitemapForm from 'components/form/SitemapForm.vue';
import SearchForm from 'components/form/SearchForm.vue';
import {  ref } from 'vue';

defineProps<{
  bot?: Bot | undefined;
}>();
const model = ref(false);

</script>

<template>
  <q-dialog v-model="model" persistent>
    <q-card flat style="min-width: 300px">
      <SearchForm
        v-if="bot?.type === BotEnum.Search"
        :color="bot.color"
        :icon="bot.icon"
        @close="console.log('close')"
      />
      <SitemapForm v-else-if="bot?.type === 'sitemap'" :color="bot.color" :icon="bot.icon" />
      <NewsForm v-else-if="bot?.type === 'news'" :color="bot.color" :icon="bot.icon" />
    </q-card>
  </q-dialog>
</template>
