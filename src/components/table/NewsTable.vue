<script setup lang="ts">
import type { Headline } from 'src/types/headline';
import type { QTableColumn } from 'quasar';
import { ref } from 'vue';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import FilterInput from 'components/input/FilterInput.vue';
import ShopifyBtn from 'components/btn/ShopifyBtn.vue';
import { age, less } from 'src/types/id';
import ViewImgBtn from 'components/btn/ViewImgBtn.vue';
import { screenshot } from 'src/types/screenshot';

const columns: QTableColumn<Headline>[] = [
  { name: 'URL', label: 'URL', field: 'url', align: 'left', style: 'width: 0;' },
  { name: 'Age', label: 'Age', field: 'id', align: 'center', format: age, sort: less },
  { name: 'Title', label: 'Title', field: 'title', align: 'left' },
  { name: 'Post', label: '', field: 'url', align: 'center', style: 'width: 0;' },
  { name: 'View', label: '', field: 'url', align: 'center', style: 'width: 0;' },
  { name: 'Delete', label: '', field: 'url', align: 'center', style: 'width: 0;' },
];

const emit = defineEmits<{
  shopify: [string];
  delete: [string];
}>();

const model = defineModel<Headline[]>({ required: true });

const filter = ref<string>('');
const columnNames = ref<string[]>(columns.map((col) => col.name));
const visibleCols = ref<string[]>(
  columns
    .map((col) => col.name)
    .filter((s) => s !== 'URL')
    .filter((s) => s !== 'Source')
    .filter((s) => s !== 'Description'),
);
</script>

<template>
  <q-table
    :columns="columns"
    :filter="filter"
    :pagination="{ sortBy: 'Age', descending: true }"
    :rows-per-page-options="[10, 25, 50, 100, 0]"
    :rows="model"
    :visible-columns="visibleCols"
    color="primary"
    row-key="url"
    rowsPerPageLabel="Results per page"
    binary-state-sort
    dense
    flat
  >
    <template #top-left>
      <FilterInput v-model="filter" placeholder="Filter News Headlines" />
    </template>
    <template #top-right>
      <ColumnsBtn v-model="visibleCols" :names="columnNames" />
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <TrashBtn
            v-if="col.name === 'Delete'"
            @delete="emit('delete', props.row.url)"
            size="sm"
            outline
          />
          <ViewImgBtn
            v-else-if="col.name === 'View'"
            title="wat"
            :url="screenshot(props.row.url, props.row.id)"
            size="sm"
          />
          <ShopifyBtn
            v-else-if="col.name === 'Post'"
            @click="emit('shopify', props.row.url)"
            size="xs"
          />
          <span v-else>{{ col.value }}</span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
