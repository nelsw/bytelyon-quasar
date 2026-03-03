<script setup lang="ts">
import type { BotSitemapResult, BotTable, SitemapRow } from 'src/types/model';
import { BotType } from 'src/types/model';
import { useRouter } from 'vue-router';
import { useDataStore } from 'stores/data-store';
import SitemapTable from 'components/table/SitemapTable.vue';
import { domain } from 'src/types/base';

const props = defineProps<{
  table: BotTable<BotType.Sitemap, SitemapRow>;
}>();

const $router = useRouter();
const $store = useDataStore();

const onDelete = async () => {
  const id = (props.table.result as BotSitemapResult).ID;
  const target = (props.table.result as BotSitemapResult).target;
  await $store.Delete(BotType.Sitemap, target, id, true);
  await $router.push('/dashboard');
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
