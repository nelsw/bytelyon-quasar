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
  <div class="q-ma-sm">
    <q-tabs
      v-model="model"
      dense
      active-color="indigo"
      indicator-color="indigo"
      align="justify"
      narrow-indicator
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

    <q-separator />

    <q-tab-panels v-model="model" animated transition-prev="fade" transition-next="fade" >
      <q-tab-panel name="Pages" label="Pages"     style="padding: 0">
        <UrlTable :rows="pages" />
      </q-tab-panel>
      <q-tab-panel name="Links" label="Links"     style="padding: 0">
        <UrlTable :rows="links" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
