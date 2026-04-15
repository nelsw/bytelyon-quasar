<script setup lang="ts">
import type { PageData, SearchBotData } from 'src/types/model';
import type { QTableColumn } from 'quasar';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import { ref } from 'vue';
import { domain, path } from 'src/types/base';
import FilterInput from 'components/input/FilterInput.vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import ViewImgBtn from 'components/btn/ViewImgBtn.vue';
import ViewJsonBtn from 'components/btn/ViewJsonBtn.vue';
import { useSearchBotResultsStore } from 'stores/search/result-store';

const columns: QTableColumn<PageData>[] = [
  { name: 'Open', label: 'Open', field: 'url', align: 'center', style: 'width: 0;', },
  { name: 'Domain', label: 'Domain', field: 'url', align: 'left', style: 'width: 0;', format: (val: string) => domain(val), },
  { name: 'Path', label: 'Path', field: 'url', align: 'left', style: 'width: 0;', format: (val: string) => path(val), },
  { name: 'Title', label: 'Title', field: 'title', align: 'left', style: 'width: 100;', },
];

const $store = useSearchBotResultsStore();

const model = defineModel<SearchBotData>({ required: true });

const filter = ref<string>('');
const visibleCols = ref<string[]>(columns.map((col) => col.name).filter((s) => s !== 'ID' && s !== 'Path'));
</script>

<template>
  <q-table
    :columns="columns"
    :filter="filter"
    :loading="$store.busy"
    :pagination="{ sortBy: 'ID', descending: false }"
    :rows-per-page-options="[25, 50, 100, 0]"
    :rows="model.pages"
    :visible-columns="visibleCols"
    color="primary"
    row-key="ID"
    rowsPerPageLabel="Results per page"
    bordered
    binary-state-sort
    dense
    flat
  >
    <template #top="props">
      <TrashBtn @click="$store.remove(model.botId, model.id)" size="md"/>
      <q-separator vertical spaced inset />
      <ViewJsonBtn
        v-if="model.pages[0]?.url.includes('google.com')"
        :title="model.pages[0]?.title as string"
        :content="model.pages[0]?.serp as object"
      />
      <q-separator
        v-if="model.pages.length > 0 && model.pages[0]?.url.includes('google.com')"
        vertical
        spaced
        inset
      />
      <FilterInput v-model="filter" />
      <div @click="$store.load(model.botId, true)" class="absolute-center">
        <span class="text-h5 text-weight-medium">{{ model.target }}</span>
      </div>
      <q-space />
      <ColumnsBtn v-model="visibleCols" :names="columns.map((col) => col.name)" />
      <q-separator vertical spaced inset />
      <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <span v-if="col.name === 'Open'">
            <ViewImgBtn
              :title="props.row.title"
              :url="`${props.row.img}`"
            />
            <OpenInNewBtn :url="col.value" size="xs" />
          </span>
          <span v-else>{{ col.value }}</span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
