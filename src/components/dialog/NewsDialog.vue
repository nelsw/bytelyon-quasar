<script setup lang="ts">


import { ref } from 'vue';
import { useNewsStore } from 'stores/news-store';
import { ulid } from 'ulid';

const store = useNewsStore();
const model = defineModel<boolean>({ default: false });
const name =ref<string>('');
const keys = ref<string[]>([]);

const handleSubmit = async () => {
  await store.create({
    id: ulid(),
    name: name.value,
    keywords: keys.value,
  })
  model.value=false;
  name.value='';
  keys.value=[];
}
</script>

<template>
  <q-dialog v-model="model" persistent>
    <q-card class="q-dialog-plugin" style="min-width: 400px" flat>
      <q-form @submit="handleSubmit">
        <q-card-section>
          <div class="text-h4 text-center text-weight-bold">News Feed Details</div>
          <q-select
            name="Keywords"
            label="Keywords"
            v-model="keys"
            use-input
            use-chips
            multiple
            square
            hide-dropdown-icon
            new-value-mode="add-unique"
            color="positive"
          />
          <q-input
            autofocus
            v-model="name"
            name="name"
            type="text"
            label="Name"
            color="positive"
            clearable
          />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            class="full-width q-mb-sm text-weight-bolder"
            color="positive"
            size="lg"
            label="Save"
            text-color="dark"
            type="submit"
          />
          <q-btn
            class="full-width text-weight-normal"
            flat
            color="positive"
            size="lg"
            label="Cancel"
            @click="model=false;name='';keys=[];"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
