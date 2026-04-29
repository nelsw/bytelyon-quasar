<script setup lang="ts">
import type { NewsBotResult } from 'src/types/model';
import type { QTableColumn } from 'quasar';
import { ref } from 'vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import FilterInput from 'components/input/FilterInput.vue';
import ShopifyBtn from 'components/btn/ShopifyBtn.vue';
import { useNewsBotResultsStore } from 'stores/news/result-store';
import { useArticleStore } from 'stores/article-store';
import { Days, Minutes } from 'src/types/base';

const columns: QTableColumn<NewsBotResult>[] = [
  { name: 'ID', label: 'ID', field: 'id', align: 'left', style: 'width: 0;' },
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
  { name: 'Post', label: '', field: 'id', align: 'center', style: 'width: 0;' },
  { name: 'Open', label: '', field: 'url', align: 'center', style: 'width: 0;' },
  { name: 'Delete', label: '', field: 'id', align: 'center', style: 'width: 0;' },
];

const props = defineProps<{
  botId: string;
}>();

const $article = useArticleStore();
const $results = useNewsBotResultsStore();
const filter = ref<string>('');
const columnNames = ref<string[]>(columns.map((col) => col.name));
const visibleCols = ref<string[]>(
  columns
    .map((col) => col.name)
    .filter((s) => s !== 'ID')
    .filter((s) => s !== 'Source')
    .filter((s) => s !== 'Description'),
);

const onDeleteResult = async (id: string) => await $results.Delete(props.botId, id);
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
    row-key="id"
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
            @delete="onDeleteResult(props.row.id)"
            size="sm"
            outline
          />
          <OpenInNewBtn v-else-if="col.name === 'Open'" :url="col.value" size="sm" color="teal" />
          <ShopifyBtn v-else-if="col.name === 'Post'" @click="$article.load(props.row)" size="xs" />
          <span v-else>{{ col.value }}</span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
