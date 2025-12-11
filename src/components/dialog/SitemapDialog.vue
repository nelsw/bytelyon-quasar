<script setup lang="ts">
import { useSitemapStore } from 'stores/sitemap-store';
import { ref, } from 'vue';

const color = `green-14`;

const store = useSitemapStore();
const model = defineModel<boolean>({ default: false });
const url = ref<string>('');

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
    <q-card>
      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="text-h6 text-center">New Sitemap</div>
          <q-input v-model="url" :color="color" label="URL" name="url" type="url" dense autofocus />
        </q-card-section>
        <q-card-actions>
          <q-btn class="full-width" label="Create" color="green-14" v-close-popup type="submit" />
          <q-btn class="full-width q-mt-sm" label="Cancel" :color="color" @click="onCancel" flat />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
