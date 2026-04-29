<script setup lang="ts">
import type { PageData } from 'src/types/model';
import type { QTableColumn } from 'quasar';
import { ref, watch } from 'vue';
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
  { name: 'View', label: '', field: 'img', align: 'center', style: 'width: 0;' },
  { name: 'Open', label: '', field: 'url', align: 'center', style: 'width: 0;' },
];

defineProps<{
  loading: boolean;
  pages: PageData[];
}>();

const filter = ref<string>('');
const columnNames = ref<string[]>(columns.map((col) => col.name));
const visibleCols = ref<string[]>(columns.map((col) => col.name));

const group = ref('Sponsored');
watch(group, () => {});
</script>

<template>
  <q-table
    :columns="columns"
    :filter="filter"
    :loading="loading"
    :rows-per-page-options="[5, 50, 100, 0]"
    :rows="pages.slice(1)"
    :visible-columns="visibleCols"
    color="primary"
    row-key="url"
    rowsPerPageLabel="Results per page"
    binary-state-sort
    dense
    flat
  >
    <template #top-left>
      <FilterInput v-model="filter" placeholder="Filter Sponsored Results" />
    </template>
    <template #top-right>
      <ColumnsBtn v-model="visibleCols" :names="columnNames" color="primary" />
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <ViewImgBtn
            v-if="col.name === 'View'"
            :title="props.row.title"
            :url="`${props.row.img}`"
          />
          <OpenInNewBtn v-else-if="col.name === 'Open'" :url="col.value" size="sm" color="teal" />

          <span v-else-if="col.name === 'Rank'">{{ pages.indexOf(props.row) }}</span>
          <span v-else>{{ col.value }}</span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
