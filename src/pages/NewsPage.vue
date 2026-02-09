<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import { QInput } from 'quasar';
import type { BotTable } from 'src/types/model';
import { type News } from 'src/types/model';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import { onMounted, ref } from 'vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';

defineProps<{
  table: BotTable;
}>();

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
    format: (value) => new Date(value).toLocaleTimeString(),
    sortable: true,
  },
  {
    name: 'Source',
    label: 'Source',
    field: 'Source',
    align: 'left',
  },
  {
    name: 'Title',
    label: 'Title',
    field: 'Title',
    align: 'left',
  },
  {
    name: 'Description',
    label: 'Description',
    field: 'Description',
    align: 'left',
  },
];

const selected = ref<News[]>([]);
const filter = ref<string>('');

const onDelete = async () => {
  // const arr = await $resStore.DeleteAll(
  //   BotType.News,
  //   selected.value.map((i: News) => i.ID),
  // );
  // props.rows.value = rows.value.filter((i: News) => arr.indexOf(i.ID) === -1);
  // selected.value = selected.value.filter((i: News) => arr.indexOf(i.ID) !== -1);
};

const columnNames = ref<string[]>([]);
const visibleCols = ref<string[]>([]);

onMounted(() => {
  columnNames.value = columns.map((col) => col.name);
  visibleCols.value = columnNames.value.filter((s) => s !== 'ID');
});
</script>

<template>
  <q-page padding>
    <q-table
      v-model:selected="selected"
      :columns="columns"
      :filter="filter"
      :rows="table.rows"
      :rows-per-page-options="[20, 50, 100, 0]"
      :pagination="{ sortBy: 'Published', descending: true }"
      row-key="ID"
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
        <q-btn
          :color="`${selected.length > 0 ? 'pink-13' : 'grey-9'}`"
          dense
          flat
          :icon="`mdi-delete${selected.length === 0 ? '-outline' : ''}`"
          :disable="selected.length === 0"
          @click="onDelete"
        />
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
        <div class="absolute-center">
          <span class="text-h5 text-weight-medium">{{ table.Bot.Target }}</span>
          <span v-if="table.rows.length > 0" class="text-body2 q-ml-sm">{{
            new Date((table.rows[0] as News).Published).toLocaleDateString()
          }}</span>
        </div>
        <q-space />
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
        <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th>
            <div class="flex items-center q-ml-sm">
              <q-checkbox v-model="props.selected" size="xs" color="pink" dense />
            </div>
          </q-th>
          <q-th>Open</q-th>
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <div class="flex items-center q-ml-sm">
              <q-checkbox v-model="props.selected" size="xs" color="pink" dense />
            </div>
          </q-td>
          <q-td auto-width>
            <div class="flex items-center">
              <OpenInNewBtn :url="props.row.URL" />
            </div>
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props" auto-width>
            <span v-if="col.name === 'Published'">{{ col.value }}</span>
            <span v-else>{{ col.value }}</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<style lang="scss"></style>
