<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSitemapStore } from 'stores/sitemap-store';
import { type QTableColumn } from 'quasar';
import { type Sitemap } from 'src/types/sitemap';
import DeleteBtn from 'components/btn/DeleteBtn.vue';

const store = useSitemapStore();
const filter = ref<string>('');
const columns: Array<QTableColumn<Sitemap>> = [
  {
    name: 'start',
    label: 'Created',
    field: 'start',
    align: 'left',
    format: (value) => new Date(value).toLocaleString(),
    sort: (a, b) => Date.parse(a) - Date.parse(b),
  },
  {
    name: 'duration',
    label: 'Duration',
    field: 'duration',
    align: 'left',
    format: (value) => `${value}s`,
  },
  {
    name: 'url',
    label: 'URL',
    field: 'url',
    align: 'left',
    sort: (a, b) => a.localeCompare(b),
  },
  {
    name: 'domain',
    label: 'Domain',
    field: 'domain',
    align: 'left',
    sort: (a, b) => a.localeCompare(b),
  },

  {
    name: 'relative',
    label: 'Relative',
    field: 'relative',
    align: 'left',
    format: (value) => value?.length,
  },
  {
    name: 'remote',
    label: 'Remote',
    field: 'remote',
    align: 'left',
    format: (value) => value?.length,
  },
  {
    name: 'delete',
    label: 'Delete',
    field: 'id',
  },
];

const expanded = ref<string[]>([]);

onMounted(store.fetch);
</script>

<template>
  <q-table
    :columns="columns"
    :fullscreen="false"
    :loading="store.loading"
    :pagination="{ sortBy: 'start' }"
    :rows="store.items"
    bordered
    color="primary"
    row-key="start"
    flat
  >
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
    <template v-slot:top-left>
      <q-icon name="mdi-web" size="md" />
      <span class="text-h5 q-ml-sm q-mt-xs"> Sitemaps </span>
    </template>
    <template v-slot:top-right>
      <q-form @submit.prevent="store.create()" class="row">
        <q-input v-model="store.url" color="positive" label="URL" name="url" type="url" dense>
          <template v-slot:prepend>
            <q-icon name="mdi-web-box" size="sm" />
          </template>
        </q-input>
        <q-btn icon="mdi-plus" color="positive" flat dense type="submit" />
      </q-form>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <span v-if="col.name.match(/relative|remote/)">
            <q-btn
              dense
              flat
              @click="
                expanded = col.name === 'relative' ? props.row.relative : props.row.remote;
                props.expand = !props.expand;
              "
            >
              <q-icon
                :name="props.expand ? 'mdi-chevron-down' : 'mdi-chevron-up'"
                color="primary"
                size="xs"
              />
              <span style="font-size: 13px; padding-right: 5px">{{ col.value }}</span>
            </q-btn>
          </span>
          <span v-else-if="col.name === 'delete'">
            <DeleteBtn id="" name=""/>
          </span>
          <span v-else>
            {{ col.value }}
          </span>
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <q-table
            :fullscreen="false"
            :rows="expanded"
            dense
            flat
            hide-header
            :rows-per-page-options="[10, 50, 100, 1000]"
            :filter="filter"
            :filter-method="(rows, terms) => rows.filter((row) => row.includes(terms))"
          >
            <template v-slot:top-left>
              <q-input
                v-model="filter"
                debounce="300"
                color="primary"
                label="Filter Links"
                name="filter"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-filter" size="sm" />
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td colspan="100%">
                  <q-btn dense flat target="_blank" :href="props.row.url" no-caps size="sm">
                    <q-icon name="mdi-open-in-new" color="primary" size="xs" class="q-mr-xs" />
                    <span style="font-size: 12px; margin-left: 2px">
                      {{ props.row }}
                    </span>
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
