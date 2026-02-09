<script setup lang="ts">
import type { Page, Search } from 'src/types/model';
import type { QTableColumn } from 'quasar';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import { onMounted, ref } from 'vue';
import { domain, path } from 'src/types/base';
import FilterInput from 'components/input/FilterInput.vue';
import DeleteBtn from 'components/btn/DeleteBtn.vue';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import ViewImgBtn from 'components/btn/ViewImgBtn.vue';

defineProps<{
  data: Search;
}>();

const columns: QTableColumn<Page>[] = [
  {
    name: 'Open',
    label: 'Open',
    field: 'URL',
    align: 'center',
    style: 'width: 0;',
  },
  {
    name: 'Domain',
    label: 'Domain',
    field: 'URL',
    align: 'left',
    style: 'width: 0;',
    format: (val: string) => domain(val),
  },
  {
    name: 'Path',
    label: 'Path',
    field: 'URL',
    align: 'left',
    style: 'width: 0;',
    format: (val: string) => path(val),
  },
  {
    name: 'Title',
    label: 'Title',
    field: 'Title',
    align: 'left',
    style: 'width: 100;',
  },
];

const filter = ref<string>('');
const columnNames = ref<string[]>([]);
const visibleCols = ref<string[]>([]);

const onDelete = async () => {};

onMounted(() => {
  columnNames.value = columns.map((col) => col.name);
  visibleCols.value = columnNames.value.filter((s) => s !== 'ID');
});
</script>

<template>
  <q-page padding>
    <q-table
      :rows="data.Pages"
      :columns="columns"
      :filter="filter"
      :rows-per-page-options="[25, 50, 100, 0]"
      :pagination="{ sortBy: 'ID', descending: false }"
      color="primary"
      row-key="ID"
      rowsPerPageLabel="Results per page"
      binary-state-sort
      dense
      flat
      bordered
      :visible-columns="visibleCols"
    >
      <template #top="props">
        <DeleteBtn @click="onDelete" />
        <q-separator vertical spaced inset />
        <FilterInput v-model="filter" />
        <div class="absolute-center">
          <span class="text-h5 text-weight-medium">{{ data.Bot.Target }}</span>
          <span class="text-body2 q-ml-sm">{{
            new Date(data.CreatedAt * 1000).toLocaleString()
          }}</span>
        </div>
        <q-space />
        <ColumnsBtn v-model="visibleCols" :names="columnNames" />
        <q-separator vertical spaced inset />
        <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
      </template>
      <template #body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <span v-if="col.name === 'Open'">
              <ViewImgBtn :title="props.row.Title" :url="`http://localhost:8080${props.row.IMG}`" />
              <OpenInNewBtn :url="col.value" />
            </span>
            <span v-else>{{ col.value }}</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
