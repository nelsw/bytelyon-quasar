<script setup lang="ts">
import { SitemapColor, SitemapIcon } from 'src/types/base';
import { ref } from 'vue';

const color = SitemapColor;
const url = ref<string>('');
const unitModel = ref<string>('Daily');

const onCancel = () => {};
</script>

<template>
  <q-form>
    <q-list>
      <q-item>
        <q-item-section avatar>
          <q-icon :name="SitemapIcon" size="lg" :color="color" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h5">Sitemap</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item>
        <q-item-section>
          <q-input
            v-model="url"
            :color="color"
            label="URL"
            name="url"
            type="url"
            dense
            autofocus
            hint="What is the site address to map?" /></q-item-section
      ></q-item>
      <q-item
        ><q-item-section>
          <q-select
            v-model="unitModel"
            :color="color"
            :options="['Hourly', 'Daily', 'Weekly', 'Do Not Repeat']"
            class="q-my-md"
            label="Repeat"
            dense
            hint="How often should we map this site?"
        /></q-item-section>
      </q-item>
      <q-separator spaced />
      <q-item>
        <q-item-section>
          <q-btn
            class="full-width"
            label="Create"
            :color="color"
            v-close-popup
            type="submit"
            text-color="grey-10"
          />
          <q-btn
            class="full-width q-mt-sm"
            label="Reset"
            :color="color"
            @click="onCancel"
            flat
            size="sm"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-form>
</template>
