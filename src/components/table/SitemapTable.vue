<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSitemapStore } from 'stores/sitemap-store';
import { type QTableColumn } from 'quasar';
import { type Sitemap } from 'src/types/sitemap';
import DeleteBtn from 'components/btn/DeleteBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import UrlTabs from 'components/tabs/UrlTabs.vue';
import XTooltip from 'components/tooltip/XTooltip.vue';
import MenuList from 'components/list/MenuList.vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import MenuBtn from 'components/btn/MenuBtn.vue';
import { decodeTime } from 'ulid';

defineProps<{
  rows: Sitemap[];
  domain: string;
}>()

const store = useSitemapStore();
const columns: QTableColumn<Sitemap>[] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
  },
  {
    name: 'created',
    label: 'Created',
    field: 'id',
    align: 'left',
    format: (value) => new Date(decodeTime(value)).toLocaleString(),
    sort: (a, b) => decodeTime(a) - decodeTime(b),
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'domain',
    label: 'Site',
    field: 'domain',
    align: 'left',
    sort: (a, b) => a.localeCompare(b),
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'relative',
    label: 'Pages',
    field: 'relative',
    align: 'center',
    format: (value) => value?.length ?? '0',
  },
  {
    name: 'remote',
    label: 'Links',
    field: 'remote',
    align: 'center',
    format: (value) => value?.length ?? '0',
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'duration',
    label: 'Duration',
    field: 'duration',
    align: 'center',
    format: (value) => `${value}s`,
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'id',
    style: 'width: 0;',
    align: 'center',
  },
];
const visibleCols = ref<string[]>([]);
onMounted(() => {
  visibleCols.value = columns.map((col) => col.name)
});
</script>

<template>
  <q-table
    :columns="columns"
    :visible-columns="visibleCols"
    :pagination="{ sortBy: 'id' }"
    :rows="rows"
    :rows-per-page-options="[1000]"
    :table-row-style-fn="() => 'cursor: pointer;'"
    row-key="id"
    hide-pagination
    flat
    dense
    class="bg-grey-10 q-ma-sm"
    :loading="store.loading"
  >
    <template #loading>
      <q-inner-loading showing color="primary" />
    </template>
    <template #top-left>
      <div class="flex justify-center items-center">
        <q-icon name="mdi-application-outline" size="md" @click="store.load()" />
        <span class="q-mx-sm text-h6">{{domain}}</span>
      </div>
    </template>
    <template #top-right="props">
      <MenuBtn icon="mdi-view-column-outline">
        <template #tooltip>
          <x-tooltip text="Columns" />
        </template>
        <template #menu-content>
          <MenuList v-model="visibleCols" />
        </template>
      </MenuBtn>
      <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
    </template>
    <template #body="props">
      <q-tr :props="props" @click="props.expand = !props.expand">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <div v-if="col.name === 'actions'">
            <OpenInNewBtn :url="props.row.url" />
            <DeleteBtn @delete="store.remove(props.row.domain, props.row.id)" />
          </div>
          <span v-else-if="col.name !== '$'" v-html="col.value" />
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%" style="padding: 0">
          <UrlTabs :pages="props.row?.relative ?? []" :links="props.row?.remote ?? []" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
