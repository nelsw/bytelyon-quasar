<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import { QInput } from 'quasar';
import type { Bot } from 'src/types/model';
import { BotType, type News } from 'src/types/model';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import { onMounted, ref } from 'vue';
import { useResultStore } from 'stores/v2/result-store';
import { useRouteX } from 'src/composable/useRoutex';
import { useBotStore } from 'stores/v2/bot-store';

const columns: QTableColumn<News>[] = [
  {
    name: 'ID',
    label: 'ID',
    field: 'ID',
    align: 'left',
  },
  {
    name: 'Published',
    label: 'Published',
    field: 'Published',
    align: 'left',
    format: (value) => new Date(value).toLocaleDateString(),
    sortable: true,
  },
  {
    name: 'source',
    label: 'Source',
    field: 'Source',
    align: 'left',
  },
  {
    name: 'title',
    label: 'Title',
    field: 'Title',
    align: 'left',
  },
];

const $x = useRouteX();
const $botStore = useBotStore();
const $resStore = useResultStore();

const target = ref<string>('');
const rows = ref<News[]>([]);
const selected = ref<News[]>([]);
const filter = ref<string>('');

const onDelete = async () => {
  const arr = await $resStore.DeleteAll(
    BotType.News,
    selected.value.map((i: News) => i.ID),
  );

  rows.value = rows.value.filter((i: News) => arr.indexOf(i.ID) === -1);
  selected.value = selected.value.filter((i: News) => arr.indexOf(i.ID) !== -1);
};

const columnNames = ref<string[]>([]);
const visibleCols = ref<string[]>([]);

onMounted(async () => {
  columnNames.value = columns.map((col) => col.name);
  visibleCols.value = columnNames.value.filter((s) => s !== 'ID');

  target.value = ($botStore.Find(BotType.News, $x.id()) as Bot).Target;
  rows.value = await $resStore.Find<News>(BotType.News, $x.id());
});
</script>

<template>
  <q-table
    v-model:selected="selected"
    :columns="columns"
    :filter="filter"
    :rows="rows"
    :rows-per-page-options="[10, 20, 50, 100, 0]"
    row-key="ID"
    selection="multiple"
    color="primary"
    dense
    flat
    :hide-bottom="rows.length < 10"
    hide-selected-banner
    binary-state-sort
    bordered
    :visible-columns="visibleCols"
  >
    <template #top="props">
      <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
      <q-separator vertical spaced inset />
      <q-btn flat dense icon="mdi-view-column-outline" color="primary">
        <q-menu>
          <q-list class="my-list" v-for="k in columnNames" :key="k">
            <q-item clickable v-close-popup dense>
              <q-item-section>
                <q-checkbox
                  :val="k"
                  :label="k"
                  color="primary"
                  v-model="visibleCols"
                  checked-icon="mdi-eye-outline"
                  unchecked-icon="mdi-eye-off-outline"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-separator vertical spaced inset />
      <q-input
        ref="my-input"
        v-model="filter"
        color="primary"
        placeholder="Filter"
        autofocus
        clearable
        clear-icon="mdi-close"
        dense
        borderless
      >
        <template #prepend>
          <q-icon name="mdi-filter-variant" color="primary" />
        </template>
      </q-input>

      <div class="text-h5 text-weight-medium q-ml-sm absolute-center">{{ target }}</div>

      <q-space />

      <q-btn
        :color="`${selected.length > 0 ? 'pink-13' : 'grey-9'}`"
        dense
        flat
        :icon="`mdi-delete${selected.length === 0 ? '-outline' : ''}`"
        :disable="selected.length === 0"
        @click="onDelete"
      />
    </template>
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th></q-th>
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
        <q-th></q-th>
        <q-th>
          <div class="flex items-center">
            <q-toggle
              v-model="props.selected"
              color="pink"
              unchecked-icon="mdi-delete-outline"
              checked-icon="mdi-delete"
              size="sm"
              dense
            />
          </div>
        </q-th>
      </q-tr>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <div class="flex justify-end items-center">
            <OpenInNewBtn :url="props.row.URL" />
          </div>
        </q-td>
        <q-td v-for="col in props.cols" :key="col.name" :props="props" auto-width>
          {{ col.value }}
        </q-td>
        <q-td></q-td>

        <q-td auto-width>
          <div class="flex justify-start items-center">
            <q-toggle
              v-model="props.selected"
              color="pink"
              unchecked-icon="mdi-delete-outline"
              checked-icon="mdi-delete"
              size="sm"
              dense
            />
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<style lang="scss">
.q-table__top {
  //background: $grey-10;
}
</style>
