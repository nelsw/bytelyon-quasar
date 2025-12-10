<script setup lang="ts">
import { useSitemapStore } from 'stores/sitemap-store';

const store = useSitemapStore();
const model = defineModel<boolean>({ default: false });
</script>

<template>
  <q-dialog v-model="model" persistent>
    <q-card>
      <q-form @submit="store.create()">
        <q-card-section>
          <div class="text-h6 text-center">New Sitemap</div>
          <q-input v-model="store.url" color="positive" label="URL" name="url" type="url" dense />
        </q-card-section>
        <q-card-actions>
          <q-btn class="full-width" label="Create" color="green-14" v-close-popup type="submit" />
          <q-btn class="full-width q-mt-sm" flat label="Cancel" color="green-14" v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
