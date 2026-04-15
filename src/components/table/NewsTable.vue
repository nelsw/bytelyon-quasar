<script setup lang="ts">
import type { NewsBotResult } from 'src/types/model';
import type { QTableColumn } from 'quasar';
import { date } from 'quasar';
import { onMounted, ref, watch } from 'vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import FilterInput from 'components/input/FilterInput.vue';
import ShopifyBtn from 'components/btn/ShopifyBtn.vue';
import { useNewsBotResultsStore } from 'stores/news/result-store';
import { useArticleStore } from 'stores/article-store';

const columns: QTableColumn<NewsBotResult>[] = [
  { name: 'ID', label: 'ID', field: 'id', align: 'left', style: 'width: 0;' },
  { name: 'Open', label: 'Open', field: 'url', align: 'center', style: 'width: 0;' },
  { name: 'Post', label: 'Post', field: 'id', align: 'center', style: 'width: 0;' },
  { name: 'Published', label: 'Published', field: 'publishedAt', align: 'left' },
  { name: 'Source', label: 'Source', field: 'source', align: 'left' },
  { name: 'Title', label: 'Title', field: 'title', align: 'left' },
  { name: 'Description', label: 'Description', field: 'description', align: 'left' }
];

const props = defineProps<{
  botId: string;
}>()

const $article = useArticleStore();
const $results = useNewsBotResultsStore();
const filter = ref<string>('');
const columnNames = ref<string[]>(columns.map((col) => col.name));
const visibleCols = ref<string[]>(
  columns
    .map((col) => col.name)
    .filter((s) => s !== 'ID')
    .filter((s) => s !== 'Description')
);
onMounted(async () => $results.load(props.botId))
watch(props, async () => $results.load(props.botId))
</script>

<template>
  <q-table
    v-model:selected="$results.selected"
    :columns="columns"
    :filter="filter"
    :loading="$results.busy"
    :pagination="{ sortBy: 'Published', descending: true }"
    :rows-per-page-options="[20, 50, 100, 0]"
    :rows="$results.find(botId)"
    :selected-rows-label="(n: number) => `${n} Article${n > 1 ? 's' : ''} selected`"
    :visible-columns="visibleCols"
    color="primary"
    row-key="id"
    rowsPerPageLabel="Articles per page"
    selection="multiple"
    binary-state-sort
    bordered
    dense
    flat
  >
    <template #top="props">
      <TrashBtn :disable="$results.selected.length === 0" @click="$results.remove" size="md"/>
      <q-separator vertical spaced inset />
      <FilterInput :filter="filter" />
      <div class="flex absolute-center items-center">
        <div @click="$results.load(botId, true)" class="text-h5 text-weight-medium text-uppercase">
          {{ $results.target(botId) }}
        </div>
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
            @click="$article.load(props.row)"
            size="xs"
          />
          <span v-else-if="col.name === 'Published'">{{ date.formatDate(col.value, 'MM/DD/YY hh:mm') }}</span>
          <span v-else>{{ col.value }}</span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
