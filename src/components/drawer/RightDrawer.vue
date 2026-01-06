<script setup lang="ts">
import { ref, watch } from 'vue';
import SearchForm from 'components/form/SearchForm.vue';
import SitemapForm from 'components/form/SitemapForm.vue';
import NewsForm from 'components/form/NewsForm.vue';
import type { Prowler } from 'src/types/base';
import {
  SearchColor,
  SearchIcon,
  SitemapColor,
  SitemapIcon,
  NewsColor,
  NewsIcon,
} from 'src/types/base';
import type { QTreeNode } from 'quasar';
import { useBotStore } from 'stores/bot-store';

const store = useBotStore();
const model = defineModel<string>({ required: true });
const type = ref('');
const prow = ref<Prowler | null>(null);
const visible = ref(false);

watch(model, () => {
  if (model.value.match(/^(search|news|sitemap)$/gi)) {
    type.value = model.value;
    prow.value = null;
    visible.value = true;
    return;
  }

  const parts = model.value.split('/');
  if (parts.length == 2) {
    type.value = parts[0] as string;
    const node: QTreeNode | null = store.find(type.value, parts[1]);
    if (node === null) return null;
    prow.value = node.data as Prowler;
    visible.value = true;
  }

  visible.value = false;
});
</script>

<template>
  <q-drawer v-model="visible" side="right" :width="275" :breakpoint="500" bordered>
    <q-scroll-area class="fit">
      <SearchForm
        v-if="type === 'search'"
        :color="SearchColor"
        :icon="SearchIcon"
        :prowler="prow"
      />
      <SitemapForm v-else-if="type === 'sitemap'" :color="SitemapColor" :icon="SitemapIcon" />
      <NewsForm v-else-if="type === 'news'" :color="NewsColor" :icon="NewsIcon" />
    </q-scroll-area>
  </q-drawer>
</template>
