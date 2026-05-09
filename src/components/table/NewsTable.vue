<script setup lang="ts">
import type { News, Post } from 'src/types/model';
import type { QTableColumn } from 'quasar';
import { ref } from 'vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import FilterInput from 'components/input/FilterInput.vue';
import ShopifyBtn from 'components/btn/ShopifyBtn.vue';
import { Days, Minutes } from 'src/types/base';
import { useNews } from 'stores/news';

const emit = defineEmits<{
  show: [Post];
}>();

const columns: QTableColumn<News>[] = [
  { name: 'URL', label: 'URL', field: 'url', align: 'left', style: 'width: 0;' },
  {
    name: 'Age',
    label: 'Age',
    field: 'publishedAt',
    align: 'center',
    format: (val) => `${Days(val)}d`,
    sort: (a, b) => Minutes(a) - Minutes(b),
  },
  { name: 'Source', label: 'Source', field: 'source', align: 'left' },
  { name: 'Title', label: 'Title', field: 'title', align: 'left' },
  { name: 'Description', label: 'Description', field: 'description', align: 'left' },
  { name: 'Post', label: '', field: 'url', align: 'center', style: 'width: 0;' },
  { name: 'Open', label: '', field: 'url', align: 'center', style: 'width: 0;' },
  { name: 'Delete', label: '', field: 'url', align: 'center', style: 'width: 0;' },
];

const props = defineProps<{
  botId: string;
}>();

const $results = useNews();
const filter = ref<string>('');
const columnNames = ref<string[]>(columns.map((col) => col.name));
const visibleCols = ref<string[]>(
  columns
    .map((col) => col.name)
    .filter((s) => s !== 'URL')
    .filter((s) => s !== 'Source')
    .filter((s) => s !== 'Description'),
);

const onDeleteResult = async (url: string) => await $results.Delete(props.botId, url);
const onShopifyClick = (r: News) => {
  emit('show', {
    summary: r.description,
    tags: [],
    image: r.image,
    backlink: r.url,
    body: r.body?.map((b) => `<p>${b}</p>`)?.join('') || '',
    publishedAt: r.publishedAt,
    title: r.title,
    keywords: r.keywords.map((s) => s.trim()).filter((s) => s !== ''),
  });
};
</script>

<template>
  <q-table
    :columns="columns"
    :filter="filter"
    :loading="$results.busy"
    :pagination="{ sortBy: 'Age', descending: true }"
    :rows-per-page-options="[10, 25, 50, 100, 0]"
    :rows="$results.model.get($route.params.botId as string, [])"
    :visible-columns="visibleCols"
    color="primary"
    row-key="url"
    rowsPerPageLabel="Results per page"
    binary-state-sort
    dense
    flat
  >
    <template #top-left>
      <FilterInput v-model="filter" placeholder="Filter News Results" />
    </template>
    <template #top-right>
      <ColumnsBtn v-model="visibleCols" :names="columnNames" />
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <TrashBtn
            v-if="col.name === 'Delete'"
            @delete="onDeleteResult(props.row.url)"
            size="sm"
            outline
          />
          <OpenInNewBtn v-else-if="col.name === 'Open'" :url="col.value" size="sm" color="teal" />
          <ShopifyBtn
            v-else-if="col.name === 'Post'"
            @click="onShopifyClick(props.row)"
            size="xs"
          />
          <span v-else>{{ col.value }}</span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
