<script setup lang="ts">
import { SitemapColor } from 'src/types/base';
import { ref } from 'vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import { exportFile, useQuasar } from 'quasar';

const props = defineProps<{
  rows: string[];
}>();
const $q = useQuasar();

const filter = ref<string>('');
const exportTable = () => {
  const content = props.rows.join('\r\n');

  const status = exportFile('table-export.csv', content, 'text/csv');

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning',
    });
  }
};
</script>

<template>
  <q-table
    :rows="rows"
    :filter="filter"
    :filter-method="(rows, terms) => rows.filter((row) => row.includes(terms))"
    :rows-per-page-options="[20, 50, 100, 0]"
    :color="SitemapColor"
    dense
    flat
  >
    <template #top-left>
      <q-input v-model="filter" :color="SitemapColor" placeholder="Filter" dense autofocus>
        <template #prepend>
          <q-icon name="mdi-filter-variant" :color="SitemapColor" />
        </template>
      </q-input>
    </template>
    <template #top-right="props">
      <q-btn color="blue-grey-5" dense flat icon="mdi-file-export-outline" @click="exportTable" />

      <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
      <q-separator vertical spaced />
      <q-btn color="red-13" dense flat icon="mdi-delete-outline" />
    </template>
    <template #header>
      <q-tr>
        <q-th style="text-align: left"> URL </q-th>
        <q-th style="text-align: right"> </q-th>
      </q-tr>
    </template>
    <template #body="props">
      <q-tr :props="props" @click="console.log">
        <q-td colspan="1" style="text-align: left">
          <span class="text-caption">
            {{ props.row }}
          </span>
        </q-td>
        <q-td colspan="1" style="text-align: right">
          <span class="text-caption">
            <OpenInNewBtn :url="props.row" />
          </span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
