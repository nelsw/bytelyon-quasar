<script setup lang="ts">
import type { BotNewsResult } from 'src/types/model';
import type { QTableColumn } from 'quasar';
import { date } from 'quasar';
import { ref } from 'vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import FilterInput from 'components/input/FilterInput.vue';
import ShopifyBtn from 'components/btn/ShopifyBtn.vue';

const columns: QTableColumn<BotNewsResult>[] = [
  { name: 'Open', label: 'Open', field: 'url', align: 'center', style: 'width: 0;' },
  { name: 'Post', label: 'Post', field: 'id', align: 'center', style: 'width: 0;' },
  {
    name: 'Published',
    label: 'Published',
    field: 'publishedAt',
    align: 'left',
    format: (d) => date.formatDate(d, 'h:mm a'),
  },
  { name: 'Source', label: 'Source', field: 'source', align: 'left' },
  { name: 'Title', label: 'Title', field: 'title', align: 'left' },
  { name: 'Description', label: 'Description', field: 'description', align: 'left' },
];

const emit = defineEmits<{
  post: [string];
  delete: [void];
}>();

defineProps<{
  target: string;
  label: string;
}>();

const rows = defineModel<BotNewsResult[]>('rows', { required: true });
const selected = defineModel<BotNewsResult[]>('selected', { required: true });

const filter = ref<string>('');
const columnNames = ref<string[]>(columns.map((col) => col.name));
const visibleCols = ref<string[]>(
  columns
    .map((col) => col.name)
    .filter((s) => s !== 'ID')
    .filter((s) => s !== 'Description'),
);
</script>

<template>
  <q-table
    v-model:selected="selected"
    :columns="columns"
    :filter="filter"
    :rows="rows"
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
      <TrashBtn :disable="selected.length === 0" @click="emit('delete')" />
      <q-separator vertical spaced inset />
      <FilterInput :filter="filter" />
      <div class="flex absolute-center items-center">
        <div class="text-h5 text-weight-medium text-uppercase">{{ target }}</div>
        <div class="text-body2 q-ml-sm">{{ label }}</div>
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
            <q-checkbox v-model="props.selected" size="xs" color="pink-13" dense />
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
          <OpenInNewBtn v-if="col.name === 'Open'" :url="col.value" size="xs" />
          <ShopifyBtn
            v-else-if="col.name === 'Post'"
            @click="emit('post', props.row.id)"
            size="xs"
          />
          <span v-else>{{ col.value }}</span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
