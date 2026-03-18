<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import type { BotNewsResult, BotTable } from 'src/types/model';
import { BotType } from 'src/types/model';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import { onMounted, ref } from 'vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import FilterInput from 'components/input/FilterInput.vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';
import { useDataStore } from 'stores/data-store';

const model = defineModel<BotTable<BotType.News, BotNewsResult>>({ required: true });

const columns: QTableColumn<BotNewsResult>[] = [
  {
    name: 'Open',
    label: 'Open',
    field: 'url',
    align: 'center',
    style: 'width: 0;',
  },
  {
    name: 'Published',
    label: 'Published',
    field: 'publishedAt',
    align: 'left',
    format: (value) => new Date(value).toLocaleTimeString(),
    sortable: true,
  },
  {
    name: 'Source',
    label: 'Source',
    field: 'source',
    align: 'left',
  },
  {
    name: 'Title',
    label: 'Title',
    field: 'title',
    align: 'left',
  },
  {
    name: 'Description',
    label: 'Description',
    field: 'description',
    align: 'left',
  },
];

const selected = ref<BotNewsResult[]>([]);
const filter = ref<string>('');
const $store = useDataStore();

const onDelete = async () => {
  const ok = await $store.DeleteAll(
    BotType.News,
    model.value.Bot.target,
    selected.value.map((i: BotNewsResult) => i.id),
  );
  if (!ok) return;
  model.value.rows = model.value.rows.filter((n) => !selected.value.includes(n));
  selected.value = [];
};

const columnNames = ref<string[]>([]);
const visibleCols = ref<string[]>([]);

onMounted(() => {
  columnNames.value = columns.map((col) => col.name);
  visibleCols.value = columnNames.value
    .filter((s) => s !== 'ID')
    .filter((s) => s !== 'Description');
});
</script>

<template>
  <q-page padding>
    <q-table
      v-model:selected="selected"
      :columns="columns"
      :filter="filter"
      :rows="model.rows"
      :rows-per-page-options="[20, 50, 100, 0]"
      :pagination="{ sortBy: 'Published', descending: true }"
      row-key="url"
      selection="multiple"
      color="primary"
      dense
      flat
      binary-state-sort
      bordered
      :visible-columns="visibleCols"
      :selected-rows-label="(n: number) => `${n} Article${n > 1 ? 's' : ''} selected`"
      rowsPerPageLabel="Articles per page"
    >
      <template #top="props">
        <TrashBtn :disable="selected.length === 0" @click="onDelete" />
        <q-separator vertical spaced inset />
        <FilterInput :filter="filter" />
        <div class="absolute-center">
          <span class="text-h5 text-weight-medium text-uppercase">{{ model.Bot.target }}</span>
          <span v-if="model.rows.length > 0" class="text-body2 q-ml-sm">{{
            new Date((model.rows[0] as BotNewsResult).publishedAt).toLocaleDateString()
          }}</span>
        </div>
        <q-space />
        <ColumnsBtn v-model="visibleCols" :names="columnNames" />
        <q-separator vertical spaced inset />
        <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th>
            <div class="flex items-center q-ml-sm">
              <q-checkbox v-model="props.selected" size="xs" color="pink" dense />
            </div>
          </q-th>
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <div class="flex items-center q-ml-sm">
              <q-checkbox v-model="props.selected" size="xs" color="pink-13" dense />
            </div>
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <OpenInNewBtn v-if="col.name === 'Open'" :url="col.value" />
            <span v-else>{{ col.value }}</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
