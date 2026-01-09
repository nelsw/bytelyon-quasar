<script setup lang="ts">
import { useBotStore } from 'stores/bot-store';
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import type { Prowler } from 'src/types/base';
import { SitemapColor } from 'src/types/base';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import { QInput, type QTableColumn, useQuasar } from 'quasar';
import type { ProwlerSitemapResult } from 'src/types/prowler';

interface Row {
  url: string;
  backlink: boolean;
}

const $q = useQuasar();
const columns: QTableColumn<Row>[] = [
  {
    name: 'backlink',
    label: 'Backlink',
    field: 'backlink',
    align: 'center',
    style: 'width: 0;',
  },
  {
    name: 'url',
    label: 'URL',
    field: 'url',
    align: 'left',
    style: 'width: 0;',
  },

  {
    name: 'actions',
    label: 'Open',
    field: 'url',
    align: 'center',
    style: 'width: 0;',
  },
];

const props = defineProps<{
  id?: string;
  date?: string;
}>();

const defaultProwler = (): Prowler => {
  return {
    id: '',
    type: 'search',
    frequency: 900000000000, // 15min of nanos
    blacklist: [],
    disabled: false,
  };
};

const defaultSession = (): ProwlerSitemapResult => {
  return {
    id: '',
    domain: '',
    relative: [],
    remote: [],
  };
};

const prowler = ref<Prowler>(defaultProwler());
const session = ref<ProwlerSitemapResult>();

const input = useTemplateRef<QInput>('my-input');
const store = useBotStore();
const filter = ref<string>('');
const rows = ref<Row[]>([]);
const loading = ref(false);
const ulid = ref<string>('');

const exportTable = () => {};

const confirm = () => {
  $q.dialog({
    title: `Confirm`,
    message: `Delete Sitemap / ${props.id} / ${props.date}?`,
    cancel: true,
    persistent: true,
    color: 'red-13',
  }).onOk(() => {
    loading.value = true;
    void store.Delete(ulid.value);
    loading.value = false;
  });
};

const setModel = () => {
  rows.value = [];

  const prowlerNode = store.find('sitemap', props.id);
  if (!prowlerNode) {
    prowler.value = defaultProwler();
    return;
  }
  prowler.value = prowlerNode.data;

  if (props.date === undefined || props.date === null) {
    return;
  }

  const sessionNode = store.find('sitemap', props.id, props.date);
  if (!sessionNode) {
    session.value = defaultSession();
    return;
  }
  session.value = sessionNode.data;
  const rel =
    session.value?.relative?.map((url: string) => {
      return { url: url, backlink: false };
    }) ?? [];
  const rem =
    session.value?.remote?.map((url: string) => {
      return { url: url, backlink: true };
    }) ?? [];
  rows.value = rel.concat(rem);
  input.value?.focus();
};

onMounted(setModel);
watch(props, setModel);
</script>

<template>
  <q-page padding>
  <q-table
    v-if="date !== undefined"
    :rows="rows"
    :columns="columns"
    :filter="filter"
    :rows-per-page-options="[20, 50, 100, 0]"
    :color="SitemapColor"
    :loading="loading"
    dense
    flat
  >
    <template #top="props">
      <div class="flex col-grow items-center">
        <q-icon name="mdi-link-variant" size="md" :color="SitemapColor" />
        <div class="text-h5 q-ml-xs q-mr-sm">Links</div>
        <q-separator vertical spaced inset />
        <q-btn color="red-13" dense flat icon="mdi-delete-outline" @click="confirm" />

        <q-space />
        <q-input
          ref="my-input"
          style="margin-bottom: 10px"
          class="q-mr-sm"
          v-model="filter"
          :color="SitemapColor"
          placeholder="Filter"
          dense
          autofocus
        >
          <template #prepend>
            <q-icon name="mdi-filter-variant" :color="SitemapColor" />
          </template>
        </q-input>
        <q-separator vertical spaced inset />
        <q-btn color="blue-grey-5" dense flat icon="mdi-file-export-outline" @click="exportTable" />
        <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
      </div>
    </template>
    <template #body-cell-backlink="props">
      <q-td :props="props">
        <q-checkbox v-model="props.row.backlink" disable />
      </q-td>
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td colspan="1" style="text-align: center">
          <q-checkbox v-model="props.row.backlink" disable dense />
        </q-td>
        <q-td colspan="1" style="text-align: left">
          <span class="text-caption">
            {{ props.row.url }}
          </span>
        </q-td>

        <q-td colspan="1" style="text-align: center">
          <span class="text-caption">
            <OpenInNewBtn :url="props.row.url" />
          </span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
  </q-page>
</template>
