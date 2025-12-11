<script setup lang="ts">
import { useSearchStore } from 'stores/search-store';
import { ref } from 'vue';
import { ulid } from 'ulid';

const color = `green-14`;
const store = useSearchStore();
const model = defineModel<boolean>({ default: false });
const query = ref<string>('');

const onSubmit = async () => {
  const q = query.value;
  onCancel();
  await store.create({
    id: ulid(),
    query: q,
    targets: {} as Map<string, boolean>,
    pages: [],
  });
};

const onCancel = () => {
  query.value = '';
  model.value = false;
};
</script>

<template>
  <q-dialog v-model="model" persistent>
    <q-card>
      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="text-h6 text-center">New Search</div>
          <q-input
            v-model="query"
            :color="color"
            label="Query"
            name="query"
            type="text"
            dense
            autofocus
          />
        </q-card-section>
        <q-card-actions>
          <q-btn class="full-width" label="Create" color="green-14" v-close-popup type="submit" />
          <q-btn class="full-width q-mt-sm" label="Cancel" :color="color" @click="onCancel" flat />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
