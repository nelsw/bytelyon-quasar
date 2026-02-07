<script setup lang="ts">
import { SitemapColor } from 'src/types/base';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import { QInput, type QTableColumn } from 'quasar';
import { type Row } from 'src/types/sitemap';
import { ref } from 'vue';
import { csv } from 'src/composable/exportTable';

const columns = ref<QTableColumn<Row>[]>([
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
]);

defineProps<{
  rows: Array<Row>;
  loading: boolean;
}>();

const filter = ref<string>('');
</script>

<template>
  <q-table
    :rows="rows"
    :columns="columns"
    :filter="filter"
    :rows-per-page-options="[20, 50, 100, 0]"
    :color="SitemapColor"
    :loading="loading"
    row-key="name"
    dense
    flat
  >
    <template #top="props">
      <div class="flex col-grow items-center">
        <q-input
          ref="my-input"
          style="margin-bottom: 10px"
          class="q-mr-sm"
          v-model="filter"
          :color="SitemapColor"
          placeholder="Filter"
          dense
          autofocus
          clearable
        >
          <template #prepend>
            <q-icon name="mdi-filter-variant" :color="SitemapColor" />
          </template>
        </q-input>
        <q-separator vertical spaced inset />
        <q-space />

        <q-separator vertical spaced inset />
        <q-btn :color="SitemapColor" dense flat icon="mdi-download" @click="csv(columns, rows)" />
        <FullScreenBtn
          :color="SitemapColor"
          :fullscreen="props.inFullscreen"
          @click="props.toggleFullscreen"
        />
      </div>
    </template>
    <template #body-cell-backlink="props">
      <q-td :props="props">
        <q-checkbox v-model="props.row.backlink" disable :color="SitemapColor" />
      </q-td>
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td colspan="1" style="text-align: center">
          <q-checkbox v-model="props.row.backlink" disable dense :color="SitemapColor" />
        </q-td>
        <q-td colspan="1" style="text-align: left">
          <span class="text-caption">
            {{ props.row.url }}
          </span>
        </q-td>

        <q-td colspan="1" style="text-align: center">
          <span class="text-caption">
            <OpenInNewBtn :url="props.row.url" :color="SitemapColor" />
          </span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<style scoped lang="scss"></style>
