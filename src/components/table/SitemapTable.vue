<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSitemapStore } from 'stores/sitemap-store';
import DeleteBtn from 'components/btn/DeleteBtn.vue';

const store = useSitemapStore();
const url = ref<string>('');
onMounted(store.fetch);
</script>

<template>
  <q-table
    :columns="[
      {
        name: 'start',
        label: 'Created',
        field: 'start',
        align: 'left',
        sort: (a, b) => Date.parse(a) - Date.parse(b),
      },
      {
        name: 'url',
        label: 'URL',
        field: 'url',
        align: 'left',
      },
      {
        name: 'links',
        label: 'Links',
        field: 'tracked',
        align: 'left',
      },
      {
        name: 'delete',
        label: 'Delete',
        field: 'delete',
      },
    ]"
    :fullscreen="false"
    :loading="store.loading"
    :pagination="{ sortBy: 'start' }"
    :rows="store.items"
    color="primary"
    row-key="start"
    flat
  >
    <template v-slot:top-left>
      <q-icon name="mdi-web" size="md" />
      <span class="text-h5 q-ml-sm q-mt-xs brand-font"> Sitemaps </span>
    </template>
    <template v-slot:top-right>
      <q-form @submit.prevent="store.create(url)" class="row">
        <q-input v-model="url" color="positive" label="URL" name="url" type="url" dense>
          <template v-slot:prepend>
            <q-icon name="mdi-web-box" size="md" />
          </template>
        </q-input>
        <q-btn icon="mdi-plus" color="positive" flat dense type="submit" />
      </q-form>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          {{ new Date(props.row.start).toLocaleString() }}
        </q-td>
        <q-td auto-width>
          <q-btn dense flat target="_blank" :href="props.row.url" no-caps>
            <q-icon name="mdi-open-in-new" color="primary" size="xs" />
            <span style="font-size: 13px; margin-left: 2px; padding-right: 2px">{{
              props.row.url
            }}</span>
          </q-btn>
        </q-td>
        <q-td auto-width>
          <q-btn dense flat @click="props.expand = !props.expand">
            <q-icon
              :name="props.expand ? 'mdi-chevron-down' : 'mdi-chevron-up'"
              color="primary"
              size="xs"
            />
            <span style="font-size: 13px; padding-right: 5px">{{
              props.row.visited.length + (props.row.tracked?.length ?? 0)
            }}</span>
          </q-btn>
        </q-td>
        <q-td auto-width style="direction: rtl">
          <DeleteBtn style="margin-right: 2px" @delete="store.remove(props.row.url)" />
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <div class="text-left">This is expand slot for row above: {{ props.row.start }}.</div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
