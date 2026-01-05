<script setup lang="ts">
import { ref } from 'vue';

const color = `green-13`;
const model = defineModel<boolean>({ default: false });
const name = ref<string>('');
const topic = ref<string>('');
const unitModel = ref<string>('Daily');
const handleSubmit = async () => {};
const onCancel = () => {
  model.value = false;
  name.value = '';
};
</script>

<template>
  <q-dialog v-model="model" persistent>
    <q-card flat style="min-width: 300px">
      <q-form @submit="handleSubmit">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <q-icon name="mdi-new-box" size="lg" :color="color" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h5">News</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />
        <q-card-section>
          <q-input
            v-model="topic"
            :color="color"
            label="Topic"
            name="url"
            type="url"
            dense
            autofocus
            hint="What news topic should we aggregate?"
          />
          <q-select
            v-model="unitModel"
            :color="color"
            :options="['Hourly', 'Daily', 'Weekly', 'Do Not Repeat']"
            class="q-my-md"
            label="Repeat"
            dense
            hint="How often should we aggregate news articles?"
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
