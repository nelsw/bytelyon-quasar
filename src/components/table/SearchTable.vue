<script setup lang="ts">
import type { PageData } from 'src/types/model';
import type { QTableColumn } from 'quasar';
import { ref } from 'vue';
import { domain, path } from 'src/types/base';
import FilterInput from 'components/input/FilterInput.vue';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import ViewImgBtn from 'components/btn/ViewImgBtn.vue';

const columns: QTableColumn<PageData>[] = [
  {
    name: 'Rank',
    label: 'Rank',
    field: 'url',
    align: 'center',
    style: 'width: 0;'
  },
  {
    name: 'Domain',
    label: 'Domain',
    field: 'url',
    align: 'left',
    style: 'width: 0;',
    format: domain,
  },
  {
    name: 'Path',
    label: 'Path',
    field: 'url',
    align: 'left',
    style: 'width: 0;',
    format: path,
  },
  { name: 'Title', label: 'Title', field: 'title', align: 'left', style: 'width: 100;' },
  { name: 'View', label: 'View', field: 'img', align: 'center', style: 'width: 0;' },
  { name: 'Open', label: 'Open', field: 'url', align: 'center', style: 'width: 0;' },
];

defineProps<{
  loading: boolean;
  pages: PageData[];
}>();

const filter = ref<string>('');
const columnNames = ref<string[]>(columns.map((col) => col.name));
const visibleCols = ref<string[]>(columns.map((col) => col.name));
</script>

<template>
  <q-table
    :columns="columns"
    :filter="filter"
    :loading="loading"
    :rows-per-page-options="[25, 50, 100, 0]"
    :rows="pages.slice(1)"
    :visible-columns="visibleCols"
    color="primary"
    row-key="url"
    rowsPerPageLabel="Sponsored Results per page"
    dense
    flat
    :hide-bottom="pages.length <= 25"
  >
    <template #top>
      <FilterInput v-model="filter" class="col-grow" placeholder="Filter Sponsored Results" autofocus/>
      <q-space />
      <ColumnsBtn v-model="visibleCols" :names="columnNames" color="primary" />
    </template>

    <template #body-cell-Rank="props">
      <q-td :props="props">
        <q-badge outline color="primary" size="sm" >
          <span class="text-white">{{props.pageIndex+1}}</span>
        </q-badge>
      </q-td>
    </template>
    <template #body-cell-Open="props">
      <q-td :props="props">
        <OpenInNewBtn  :url="props.value" size="sm" color="teal" />
      </q-td>
    </template>
    <template #body-cell-View="props">
      <q-td :props="props">
        <ViewImgBtn :title="props.row.title" :url="`${props.row.img}`" size="sm" />
      </q-td>
    </template>
  </q-table>
</template>
