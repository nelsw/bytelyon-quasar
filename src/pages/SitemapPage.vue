<script setup lang="ts">
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import { type QTableColumn } from 'quasar';
import { onMounted, ref, watch } from 'vue';
import { csv } from 'src/composable/exportTable';
import type { Sitemap } from 'src/types/model';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import { useBotStore } from 'stores/bot-store';
import { useRouter } from 'vue-router';
import FilterInput from 'components/input/FilterInput.vue';
import DeleteBtn from 'components/btn/DeleteBtn.vue';

export interface row {
  URL: string;
}

const props = defineProps<{
  data: Sitemap;
}>();

const columns: QTableColumn<row>[] = [
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
  await $router.push({ name: 'index' });
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
        <DeleteBtn @click="onDelete" />
        <q-separator vertical spaced inset />
        <FilterInput :filter="filter" />
        <div class="flex col-grow items-center">
          <div class="absolute-center">
            <span class="text-h5 text-weight-medium">{{ data.Domain }}</span>
            <span v-if="data.CreatedAt">
              <span class="text-body2 q-ml-sm">{{
                new Date(data.CreatedAt).toLocaleString()
              }}</span>
            </span>
          </div>
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
  </q-page>
</template>

<style scoped lang="scss"></style>
