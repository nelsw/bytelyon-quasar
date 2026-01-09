<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import { useBotStore } from 'stores/bot-store';
import { decodeTime } from 'ulid';
import { NewsColor } from 'src/types/base';
import type { QTableColumn } from 'quasar';
import { QInput, useQuasar } from 'quasar';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import { useRouter } from 'vue-router';

interface Row {
  id: string;
  url: string;
  title: string;
  source: string;
}

const $q = useQuasar();
const $r = useRouter();
const columns: QTableColumn<Row>[] = [
  {
    name: 'id',
    label: 'Published',
    field: 'id',
    align: 'left',
    format: (value) => new Date(decodeTime(value)).toLocaleString(),
    sort: (_a, _b, rowA, rowB) => (decodeTime(rowA.id) > decodeTime(rowB.id) ? 1 : -1),
    sortable: true,
  },
  {
    name: 'source',
    label: 'Source',
    field: 'source',
    align: 'left',
    sort: (a, b) => a.localeCompare(b),
    sortable: true,
  },
  {
    name: 'title',
    label: 'Title',
    field: 'title',
    align: 'left',
  },
  {
    name: 'delete',
    label: '',
    field: 'id',
    align: 'right',
  },
];

const props = defineProps<{
  id?: string;
  date?: string;
}>();

const loading = ref(false);
const store = useBotStore();
const filter = ref<string>('');
const selected = ref([]);
const input = useTemplateRef<QInput>('my-input');
const rows = ref<Row[]>([]);
const exportTable = () => {};
const confirm = () => {
  $q.dialog({
    title: 'Confirm',
    message: 'Delete selected Articles?',
    cancel: true,
    persistent: true,
    color: 'red-13',
  }).onOk(() => {
    loading.value = true;
    selected.value.forEach((row: Row) => {
      void store.Delete(row.id);
      rows.value.splice(rows.value.indexOf(row), 1);
    });
    void store.load('news')
    if (rows.value.length === 0) {
      void $r.push({ name: 'news', params: { id: props.id } });
    }
    loading.value = false;
  });
};
const setModel = () => {
  rows.value = [];
  const node = store.find('news', props.id, props.date);
  if (!node) return;
  rows.value = node.data;
  input.value?.focus();
};
onMounted(setModel);
watch(props, setModel);
</script>

<template>
  <q-table
    v-if="id && date"
    :loading="loading"
    :color="NewsColor"
    :rows="rows"
    :rows-per-page-options="[10, 20, 50, 100, 0]"
    :pagination="{ sortBy: 'id' }"
    :filter="filter"
    :columns="columns"
    row-key="id"
    selection="multiple"
    v-model:selected="selected"
    dense
    flat
    binary-state-sort
  >
    <template #top="props">
      <div class="flex col-grow items-center">
        <q-icon name="mdi-newspaper-variant" size="md" :color="NewsColor" />
        <div class="text-h5 q-ml-xs q-mr-sm">Articles</div>
        <q-separator vertical spaced inset />
        <q-btn
          color="red-13"
          dense
          flat
          icon="mdi-delete-outline"
          @click="confirm"
          :disable="selected.length === 0"
        />
        <q-space />
        <q-input
          ref="my-input"
          style="margin-bottom: 10px"
          class="q-mr-sm"
          v-model="filter"
          :color="NewsColor"
          placeholder="Filter"
          dense
          autofocus
        >
          <template #prepend>
            <q-icon name="mdi-filter-variant" :color="NewsColor" />
          </template>
        </q-input>
        <q-separator vertical spaced inset />
        <q-btn color="blue-grey-5" dense flat icon="mdi-file-export-outline" @click="exportTable" />
        <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
      </div>
    </template>
    <template #body-cell-delete="props">
      <q-td :props="props">
        <OpenInNewBtn :url="props.row.url" @click="confirm" />
      </q-td>
    </template>
  </q-table>
</template>
