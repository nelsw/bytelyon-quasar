<script setup lang="ts">
import { useNewsBotResultsStore } from 'stores/news/result-store';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import FilterInput from 'components/input/FilterInput.vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import ShopifyBtn from 'components/btn/ShopifyBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import type { QTableColumn } from 'quasar';
import { date } from 'quasar';
import type { Bot, NewsBotResult } from 'src/types/model';
import ShopifyDialog from 'components/dialog/ShopifyDialog.vue';
import { useNewsBotStore } from 'stores/news/bot-store';

const fmtTs = (a: unknown, r: NewsBotResult) => date.formatDate(r.publishedAt, 'MM/DD/YY hh:mm');
const columns: QTableColumn<NewsBotResult>[] = [
  { name: 'Open', label: 'Open', field: 'url', align: 'center', style: 'width: 0;' },
  { name: 'Post', label: 'Post', field: 'id', align: 'center', style: 'width: 0;' },
  { name: 'Published', label: 'Published', field: 'publishedAt', align: 'left', format: fmtTs },
  { name: 'Source', label: 'Source', field: 'source', align: 'left' },
  { name: 'Title', label: 'Title', field: 'title', align: 'left' },
  { name: 'Description', label: 'Description', field: 'description', align: 'left' },
];

const $route = useRoute();
const $bots = useNewsBotStore();
const $store = useNewsBotResultsStore();

const articleDialog = ref<boolean>(false);
const filter = ref<string>('');
const bot = ref<Bot>();
const selected = ref<NewsBotResult[]>([]);
const result = ref<NewsBotResult | null>(null);
const columnNames = ref<string[]>(columns.map((col) => col.name));
const visibleCols = ref<string[]>(
  columns
    .map((col) => col.name)
    .filter((s) => s !== 'ID')
    .filter((s) => s !== 'Description'),
);

const onDelete = async () => {
  if (await $store.remove(...selected.value)) {
    selected.value = [];
  }
};

const onChange = async (botId: string | string[] | undefined) => {
  if (!botId) botId = $route.params.botId;
  botId = botId as string;
  bot.value = $bots.model.get(botId);
  await $store.load(botId);
  // rows.value = $store.model.find((g: NewsBotResultGroup) => g.botId === botId)?.results || [];
};

onMounted(onChange);
watch(() => $route.params.botId, onChange);
</script>

<template>
  <ShopifyDialog v-model:result="result" v-model:show="articleDialog" />
  <div class="q-pa-md">
    <q-table
      v-model:selected="selected"
      :loading="$store.loading"
      :columns="columns"
      :filter="filter"
      :rows="$store.rows(bot)"
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
        <div class="flex absolute-center items-center">
          <div class="text-h5 text-weight-medium text-uppercase">
            {{ $store.rows(bot)[0]?.target }}
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
  </div>
</template>
