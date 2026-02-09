<script setup lang="ts">
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import { QInput, type QTableColumn } from 'quasar';
import { onMounted, ref, watch } from 'vue';
import { csv } from 'src/composable/exportTable';
import type { Sitemap } from 'src/types/model';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import { useBotStore } from 'stores/v2/bot-store';
import { useRouter } from 'vue-router';

export interface row {
  URL: string;
}

const props = defineProps<{
  data: Sitemap;
}>();

const columns: QTableColumn<row>[] = [
  {
    name: 'URL',
    label: 'URL',
    field: 'URL',
    align: 'left',
    style: 'width: 0;',
    sortable: true,
  },
];

const $router = useRouter();
const $bots = useBotStore();

const rel = ref<row[]>([]);
const rem = ref<row[]>([]);
const rows = ref<row[]>([]);
const filter = ref<string>('');
const toggle = ref<boolean>(false);
const onDelete = async () => {
  // todo - fix this; it will delete the bot, and not the result
  await $bots.Delete(props.data.BotID);
  await $router.push({name: 'index'});
};

onMounted(() => {
  rel.value = props.data.Relative.map((URL: string) => {
    return { URL };
  });
  if (props.data.Remote !== null) {
    rem.value = props.data.Remote.map((URL: string) => {
      return { URL };
    });
  }
  rows.value = rel.value;
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
  <q-page padding>
    <q-table
      :rows="rows"
      :columns="columns"
      :filter="filter"
      :rows-per-page-options="[20, 50, 100, 0]"
      :pagination="{ sortBy: 'URL', descending: false }"
      color="primary"
      row-key="URL"
      rowsPerPageLabel="URLs per page"
      binary-state-sort
      dense
      flat
      bordered
    >
      <template #top="props">
        <q-btn color="pink" dense flat icon="mdi-delete" @click="onDelete" />
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
          <div class="absolute-center">
            <span class="text-h5 text-weight-medium">{{ data.Domain }}</span>
            <span v-if="data.CreatedAt">
              <span class="text-body2 q-ml-sm">{{
                new Date(data.CreatedAt * 1000).toLocaleString()
              }}</span>
            </span>
          </div>

          <q-space />
          <q-toggle
            v-if="rem.length > 0"
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
          <q-separator v-if="rem.length > 0" vertical spaced inset />
          <q-btn color="primary" dense flat icon="mdi-download" @click="csv(columns, rows)" />
          <q-separator vertical spaced inset />
          <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
        </div>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th>Open</q-th>
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template #body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <OpenInNewBtn :url="props.row.URL" color="primary" />
          </q-td>
          <q-td>
            {{ props.row.URL }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<style scoped lang="scss"></style>
