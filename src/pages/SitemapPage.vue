<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Sitemap, SitemapRow } from 'src/types/model';
import { useRouter } from 'vue-router';
import { useDataStore } from 'stores/data-store';
import SitemapTable from 'components/table/SitemapTable.vue';

const props = defineProps<{
  data: Sitemap;
}>();

const $router = useRouter();
const $store = useDataStore();
const rows = ref<SitemapRow[]>([]);

const onDelete = async () => {
  await $store.Delete(props.data.Bot.Type, props.data.ID, true);
  await $router.push({ name: 'index' });
};

onMounted(() => {
  rows.value = props.data.Relative.map((URL: string) => {
    return { URL: URL, IsExternal: false };
  });
  if (props.data.Remote === null) return;
  props.data.Remote.map((URL: string): SitemapRow => {
    return { URL: URL, IsExternal: true };
  }).forEach((row: SitemapRow) => rows.value.push(row));
});
</script>

<template>
  <q-page padding>
    <SitemapTable
      @delete="onDelete"
      :domain="data.Domain"
      :created-at="data.CreatedAt"
      :rows="rows"
    />
  </q-page>
</template>
