<script setup lang="ts">
import type { BotTable, SitemapRow } from 'src/types/model';
import { BotType } from 'src/types/model';
import { useRouter } from 'vue-router';
import { useDataStore } from 'stores/data-store';
import SitemapTable from 'components/table/SitemapTable.vue';
import { domain } from 'src/types/base';

defineProps<{
  table: BotTable<SitemapRow>;
}>();

const $router = useRouter();
const $store = useDataStore();

const onDelete = async () => {
  await $store.Delete(BotType.Sitemap, '', true);
  await $router.push({ name: 'index' });
};
</script>

<template>
  <q-page padding>
    <SitemapTable
      @delete="onDelete"
      :domain="domain(table.Bot.target)"
      :created-at="new Date(table.Bot.updatedAt || 0).toLocaleString()"
      :rows="table.rows as Array<SitemapRow>"
    />
  </q-page>
</template>
