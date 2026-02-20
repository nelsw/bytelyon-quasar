<script setup lang="ts">
import TrashBtn from 'components/btn/TrashBtn.vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import FilterInput from 'components/input/FilterInput.vue';
import type { QTableColumn } from 'quasar';
import { computed, ref } from 'vue';
import type { SitemapRow } from 'src/types/model';
import { csv } from 'src/composable/exportTable';

const columns: QTableColumn<SitemapRow>[] = [
  {
    name: 'Open',
    label: 'Open',
    field: 'URL',
    align: 'center',
    style: 'width: 0;',
  },
  {
    name: 'URL',
    label: 'URL',
    field: 'URL',
    align: 'left',
  },
];

const props = defineProps<{
  domain: string;
  createdAt: string | null;
  rows: SitemapRow[];
}>();

const emit = defineEmits<{
  delete: [void];
}>();

const filter = ref<string>('');
const toggle = ref<boolean>(false);
const visibleRows = computed(() =>
  props.rows.filter((row: SitemapRow) => row.IsExternal === toggle.value),
);
const hasExternalUrls = computed(
  () => props.rows.filter((row: SitemapRow) => row.IsExternal === toggle.value).length > 0,
);
const onExport = () => {
  csv(columns, props.rows);
};
</script>

<template>
  <q-table
    :columns="columns"
    :filter="filter"
    :pagination="{ sortBy: 'URL', descending: false }"
    :rows-per-page-options="[20, 50, 100, 0]"
    :rows="visibleRows"
    color="primary"
    row-key="URL"
    rowsPerPageLabel="URLs per page"
    binary-state-sort
    bordered
    dense
    flat
  >
    <template #top="props">
      <TrashBtn @click="emit('delete')" />
      <q-separator vertical spaced inset />
      <FilterInput :filter="filter" />
      <div class="flex col-grow items-center">
        <div class="absolute-center">
          <span class="text-h5 text-weight-medium">{{ domain }}</span>
          <span v-if="createdAt">
            <span class="text-body2 q-ml-sm">{{ new Date(createdAt).toLocaleString() }}</span>
          </span>
        </div>
      </div>
      <q-space />
      <q-toggle
        v-if="hasExternalUrls"
        v-model="toggle"
        checked-icon="mdi-check"
        color="primary"
        left-label
        label="External URLs"
        unchecked-icon="mdi-close"
        dense
        size="sm"
        class="q-mr-sm"
      />
      <q-separator v-if="hasExternalUrls" vertical spaced inset />
      <q-btn color="primary" dense flat icon="mdi-download" @click="onExport" />
      <q-separator vertical spaced inset />
      <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <OpenInNewBtn v-if="col.name === 'Open'" :url="col.value" />
          <span v-else>{{ col.value }}</span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
