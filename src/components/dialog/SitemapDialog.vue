<script setup lang="ts">
import { useSitemapStore } from 'stores/sitemap-store';
import { ref } from 'vue';

const color = `green-13`;

const store = useSitemapStore();
const model = defineModel<boolean>({ default: false });
const url = ref<string>('');
const unitModel = ref<string>('Daily');
const onSubmit = async () => {
  const u = url.value;
  onCancel();
  await store.create(u);
};

const onCancel = () => {
  url.value = '';
  model.value = false;
};
</script>

<template>
  <q-dialog v-model="model" persistent>
    <q-card flat style="min-width: 275px">
      <q-form @submit="onSubmit">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <q-icon name="mdi-new-box" size="lg" :color="color" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h5">Sitemap</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-card-section>
          <q-input
            v-model="url"
            :color="color"
            label="URL"
            name="url"
            type="url"
            dense
            autofocus
            hint="What is the site address to map?"
          />
          <q-select
            v-model="unitModel"
            :color="color"
            :options="['Hourly', 'Daily', 'Weekly', 'Do Not Repeat']"
            class="q-my-md"
            label="Repeat"
            dense
            hint="How often should we map this site?"
          />
        </q-card-section>
        <q-separator />
        <q-card-section>
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
            label="Cancel"
            :color="color"
            @click="onCancel"
            flat
            size="sm"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
