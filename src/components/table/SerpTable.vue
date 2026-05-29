<script setup lang="ts">
import { ref } from 'vue';
import FilterInput from 'components/input/FilterInput.vue';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import { Color, Columns, type Row } from 'src/types/serp';
import ViewImgBtn from 'components/btn/ViewImgBtn.vue';
import { screenshot } from 'src/types/screenshot';

defineProps<{
  id?: string | undefined;
}>();

const model = defineModel<Row[]>({ required: true });

const filter = ref<string>('');
const columnNames = ref<string[]>(Columns.map((col) => col.name));
const visibleCols = ref<string[]>(
  columnNames.value.filter((n) => n !== 'Description').filter((n) => n !== 'URL'),
);
</script>

<template>
  <q-table
    :columns="Columns"
    :filter="filter"
    :rows-per-page-options="[0]"
    :rows="model"
    :visible-columns="visibleCols"
    color="primary"
    row-key="uid"
    rowsPerPageLabel="SERP Results"
    dense
    flat
    hide-bottom
    wrap-cells
  >
    <template #top>
      <FilterInput v-model="filter" placeholder="Filter Search Results" />
      <q-space />
      <ColumnsBtn v-model="visibleCols" :names="columnNames" color="primary" />
    </template>
    <template #body-cell-Section="props">
      <q-td :props="props">
        <q-badge outline :color="Color(props.row.section)">
          <span class="text-white">{{ props.value }}</span>
        </q-badge>
      </q-td>
    </template>
    <template #body-cell-Rank="props">
      <q-td :props="props">
        <q-badge :color="Color(props.row.section)">
          <span class="text-dark text-weight-bolder">{{ props.value }}</span>
        </q-badge>
      </q-td>
    </template>
    <template #body-cell-View="props">
      <q-td :props="props">
        <ViewImgBtn
          :title="props.row.title"
          :url="screenshot(props.row.url, id)"
          size="sm"
          :disable="props.row.section !== `Sponsored`"
        />
      </q-td>
    </template>
    <template #body-cell-Visit="props">
      <q-td :props="props">
        <OpenInNewBtn :url="props.value" size="sm" />
      </q-td>
    </template>
  </q-table>
</template>
