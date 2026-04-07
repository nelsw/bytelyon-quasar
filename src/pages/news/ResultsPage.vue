<script setup lang="ts">
import { useNewsBotResultsStore } from 'stores/news/result-store';
import { onMounted, onUpdated, ref } from 'vue';
import { useRouter } from 'vue-router';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import FilterInput from 'components/input/FilterInput.vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import ShopifyBtn from 'components/btn/ShopifyBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import type { QTableColumn } from 'quasar';
import { date } from 'quasar';
import type { NewsBotResult } from 'src/types/model';
import ShopifyDialog from 'components/dialog/ShopifyDialog.vue';

const $store = useNewsBotResultsStore();
const $router = useRouter();
const fmtTs = (a: unknown, r: NewsBotResult) => date.formatDate(r.publishedAt, 'MM/DD/YY hh:mm');
const columns: QTableColumn<NewsBotResult>[] = [
  { name: 'Open', label: 'Open', field: 'url', align: 'center', style: 'width: 0;' },
  { name: 'Post', label: 'Post', field: 'id', align: 'center', style: 'width: 0;' },
  { name: 'Published', label: 'Published', field: 'publishedAt', align: 'left', format: fmtTs },
  { name: 'Source', label: 'Source', field: 'source', align: 'left' },
  { name: 'Title', label: 'Title', field: 'title', align: 'left' },
  { name: 'Description', label: 'Description', field: 'description', align: 'left' },
];

const articleDialog = ref<boolean>(false);
const filter = ref<string>('');
const target = ref<string>('');
const botId = ref<string>('');
const rows = ref<NewsBotResult[]>([]);
const selected = ref<NewsBotResult[]>([]);
const result = ref<NewsBotResult | null>(null);
const columnNames = ref<string[]>(columns.map((col) => col.name));
const visibleCols = ref<string[]>(
  columns
    .map((col) => col.name)
    .filter((s) => s !== 'ID')
    .filter((s) => s !== 'Description'),
);

const onchange = async () => {
  botId.value = $router.currentRoute.value.params.botId as string;
  const group = await $store.get(botId.value);
  if (group) {
    target.value = group.target;
    rows.value = group.results;
  }
};

onUpdated(onchange)
onMounted(onchange);
</script>

<template>
  <ShopifyDialog v-model:result="result" v-model:show="articleDialog" />
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
      <TrashBtn :disable="selected.length === 0" @click="$store.remove(...selected)" />
      <q-separator vertical spaced inset />
      <FilterInput :filter="filter" />
      <div class="flex absolute-center items-center">
        <div class="text-h5 text-weight-medium text-uppercase">{{ target }}</div>
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
            @click="
              result = props.row;
              articleDialog = true;
            "
            size="xs"
          />
          <span v-else>{{ col.value }}</span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<style scoped lang="scss"></style>
