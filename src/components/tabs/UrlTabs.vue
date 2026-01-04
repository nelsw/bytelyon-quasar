<script setup lang="ts">
import UrlTable from 'components/table/UrlTable.vue';

defineProps<{
  pages: string[];
  links: string[];
}>();
const model = defineModel<string>({
  default: 'Pages',
});
</script>

<template>
  <q-tabs
    v-model="model"
    dense
    active-color="deep-purple-12"
    align="left"
  >
    <q-tab name="Pages">
      <span>
        <q-icon name="mdi-file-find" size="xs" />
        Pages
      </span>
    </q-tab>
    <q-tab name="Links">
      <span>
        <q-icon name="mdi-link-box-outline" size="xs" />
        Links
      </span>
    </q-tab>
  </q-tabs>
  <q-tab-panels v-model="model" animated transition-prev="fade" transition-next="fade">
    <q-tab-panel name="Pages" label="Pages">
      <UrlTable :rows="pages" />
    </q-tab-panel>
    <q-tab-panel name="Links" label="Links">
      <UrlTable :rows="links" />
    </q-tab-panel>
  </q-tab-panels>
</template>
