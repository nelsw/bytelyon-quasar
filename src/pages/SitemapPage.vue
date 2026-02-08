<script setup lang="ts">
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import { QInput, type QTableColumn } from 'quasar';
import { onMounted, ref, watch } from 'vue';
import { csv } from 'src/composable/exportTable';
import type { Sitemap } from 'src/types/model';
import { BotType } from 'src/types/model';
import { useRouteX } from 'src/composable/useRoutex';
import { useResultStore } from 'stores/v2/result-store';

export interface row {
  url: string;
}
const columns: QTableColumn<row>[] = [
  {
    name: 'url',
    label: 'URL',
    field: 'url',
    align: 'left',
    style: 'width: 0;',
  },
];

const $x = useRouteX();
const $resStore = useResultStore();

const rel = ref<row[]>([]);
const rem = ref<row[]>([]);
const rows = ref<row[]>([]);
const target = ref<string>('');
const filter = ref<string>('');
const toggle = ref<boolean>(false);

onMounted(async () => {
  const sitemaps = await $resStore.Find<Sitemap>(BotType.Sitemap, $x.id());
  const sitemap = sitemaps.find((s: Sitemap) => s.ID === $x.result()) as Sitemap;
  target.value = sitemap.Domain;
  rel.value = sitemap.Relative.map((s: string) => {
    return { url: s };
  });
  rem.value = sitemap.Relative.map((s: string) => {
    return { url: s };
  });
  rows.value = [...rel.value, ...rem.value];
});
watch(toggle, (val: boolean) => {
  if (val) {
    rows.value = [...rel.value, ...rem.value];
  } else {
    rows.value = rel.value;
  }
});
</script>

<template>
  <q-table
    :rows="rows"
    :columns="columns"
    :filter="filter"
    :rows-per-page-options="[20, 50, 100, 0]"
    color="primary"
    row-key="name"
    dense
    flat
    bordered
  >
    <template #top="props">
      <FullScreenBtn
        color="primary"
        :fullscreen="props.inFullscreen"
        @click="props.toggleFullscreen"
      />
      <q-separator vertical spaced inset />
      <div class="flex col-grow items-center">
        <q-input
          ref="my-input"
          v-model="filter"
          color="primary"
          placeholder="Filter"
          dense
          autofocus
          clearable
          borderless
        >
          <template #prepend>
            <q-icon name="mdi-filter-variant" color="primary" />
          </template>
        </q-input>
        <div class="text-h5 text-weight-medium q-ml-sm absolute-center">{{ target }}</div>
        <q-space />
        <q-toggle
          v-model="toggle"
          checked-icon="mdi-check"
          color="positive"
          left-label
          label="External URLs"
          unchecked-icon="mdi-close"
          icon-color="dark"
          dense
          size="sm"
          class="q-mr-sm"
        />
        <q-separator vertical spaced inset />
        <q-btn color="primary" dense flat icon="mdi-download" @click="csv(columns, rows)" />
      </div>
    </template>
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th></q-th>
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <OpenInNewBtn :url="props.row.url" color="primary" />
        </q-td>
        <q-td>
          {{ props.row.url }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<style scoped lang="scss"></style>
