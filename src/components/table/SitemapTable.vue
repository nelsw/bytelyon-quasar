<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSitemapStore } from 'stores/sitemap-store';
import { type QTableColumn } from 'quasar';
import { type Sitemap } from 'src/types/sitemap';
import DeleteBtn from 'components/btn/DeleteBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import UrlTabs from 'components/tabs/UrlTabs.vue';
import PlusButton from 'components/btn/PlusButton.vue';
import XTooltip from 'components/tooltip/XTooltip.vue';
import MenuList from 'components/list/MenuList.vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import MenuBtn from 'components/btn/MenuBtn.vue';
import SitemapDialog from 'components/dialog/SitemapDialog.vue';

const rowToDelete = ref<string>('');
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
    field: 'start',
    align: 'left',
    format: (value) => new Date(value).toLocaleString(),
    sort: (a, b) => Date.parse(a) - Date.parse(b),
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
    format: (value) => value?.length,
  },
  {
    name: 'remote',
    label: 'Links',
    field: 'remote',
    align: 'center',
    format: (value) => value?.length,
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
const dialog = ref<boolean>(false);
onMounted(async () => {
  visibleCols.value = columns.map((col) => col.name)
  await store.load();
});
</script>

<template>
  <SitemapDialog v-model="dialog"/>
  <q-table
    :columns="columns"
    :visible-columns="visibleCols"
    :loading="store.loading"
    :pagination="{ sortBy: 'id' }"
    :rows="store.model"
    :table-row-style-fn="() => 'cursor: pointer;'"
    row-key="id"
    flat
    dense
  >
    <template #loading>
      <q-inner-loading showing color="primary" />
    </template>
    <template #top-left>
      <div class="flex justify-center items-center">
        <q-icon name="mdi-web" size="lg" @click="store.load()" />
        <span class="q-mx-sm text-h5">Sitemaps</span>
      </div>
    </template>
    <template #top-right="props">
      <PlusButton hint="New<br>Sitemap" @click="dialog = true"/>
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
            <DeleteBtn
              :id="props.row.id"
              @select="(s: string) => (rowToDelete = s)"
              @cancel="rowToDelete = ''"
              @delete="store.remove(props.row.url)"
            />
          </div>
          <span v-else-if="col.name !== '$'" v-html="col.value" />
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%" style="padding: 0">
          <UrlTabs :pages="props.row.relative" :links="props.row.remote" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
