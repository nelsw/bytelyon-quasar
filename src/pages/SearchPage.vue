<script setup lang="ts">
import type { BotNode, BotSearchResult, SearchBotData } from 'src/types/model';
import type { QTableColumn } from 'quasar';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import { onMounted, ref } from 'vue';
import { domain, path } from 'src/types/base';
import FilterInput from 'components/input/FilterInput.vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import ViewImgBtn from 'components/btn/ViewImgBtn.vue';
import { useDataStore } from 'stores/data-store';
import ViewJsonBtn from 'components/btn/ViewJsonBtn.vue';

const props = defineProps<{
  node: BotNode;
}>();

const columns: QTableColumn<SearchBotData>[] = [
  {
    name: 'Open',
    label: 'Open',
    field: 'url',
    align: 'center',
    style: 'width: 0;',
  },
  {
    name: 'Domain',
    label: 'Domain',
    field: 'url',
    align: 'left',
    style: 'width: 0;',
    format: (val: string) => domain(val),
  },
  {
    name: 'Path',
    label: 'Path',
    field: 'url',
    align: 'left',
    style: 'width: 0;',
    format: (val: string) => path(val),
  },
  {
    name: 'Title',
    label: 'Title',
    field: 'title',
    align: 'left',
    style: 'width: 100;',
  },
];

const filter = ref<string>('');
const columnNames = ref<string[]>([]);
const visibleCols = ref<string[]>([]);

const $store = useDataStore();
const onDelete = async () => {
  await $store.Delete(props.node.type, props.node.target, props.node.id, true);
};

onMounted(() => {
  columnNames.value = columns.map((col) => col.name);
  visibleCols.value = columnNames.value.filter((s) => s !== 'ID');
});
const result = () => props.node.rows as BotSearchResult[];
</script>

<template>
  <q-page padding>
    <q-table
      :rows="node.rows as BotSearchResult[]"
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
        <TrashBtn @click="onDelete" />
        <q-separator vertical spaced inset />
        <ViewJsonBtn
          v-if="result().length > 0 && result()[0]?.url.includes('google.com')"
          :title="result()[0]?.title as string"
          :content="result()[0]?.serp as object"
        />
        <q-separator
          v-if="result().length > 0 && result()[0]?.url.includes('google.com')"
          vertical
          spaced
          inset
        />
        <FilterInput v-model="filter" />
        <div class="absolute-center">
          <span class="text-h5 text-weight-medium">{{ node.target }}</span>
          <span class="text-body2 q-ml-sm">{{ node.label }}</span>
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
              <ViewImgBtn
                :title="props.row.Title"
                :url="`https://bytelyon-public.s3.amazonaws.com/${result()[0]?.img}`"
              />
              <OpenInNewBtn :url="col.value" />
            </span>
            <span v-else>{{ col.value }}</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
