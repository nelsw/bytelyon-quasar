<script setup lang="ts">
import { ref, watch } from 'vue';
import SearchForm from 'components/form/SearchForm.vue';
import SitemapForm from 'components/form/SitemapForm.vue';
import NewsForm from 'components/form/NewsForm.vue';

const model = defineModel<string>({ required: true });

const visible = ref(false);

watch(model, () => (visible.value = !!model.value.toString().match(/^(search|news|sitemap)$/gi)));
</script>

<template>
  <q-drawer v-model="visible" side="right" :width="275" :breakpoint="500"  bordered>
    <q-scroll-area class="fit">
      <SearchForm v-if="model === 'search'" />
      <SitemapForm v-else-if="model === 'sitemap'" />
      <NewsForm v-else-if="model === 'news'" />
    </q-scroll-area>
  </q-drawer>
</template>
