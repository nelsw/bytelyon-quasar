<script setup lang="ts">
import { type Prowler } from 'src/types/base';
import { QInput } from 'quasar';
import FrequencyInput from 'components/input/FrequencyInput.vue';

defineProps<{
  color: string;
  icon: string;
  disable: boolean;
}>();

const model = defineModel<Prowler>({ required: true });

const onSubmit = () => {};
</script>

<template>
  <q-form @submit="onSubmit">
    <div class="flex items-center">
      <q-input
        class="q-mr-lg"
        v-model="model.id"
        :color="color"
        label="URL"
        name="url"
        type="url"
        :rules="[(val: string) => (val && val.length > 0) || 'Query is required']"
        lazy-rules
        style="width: 450px"
        :disable="model.user_id !== undefined"
      >
        <template #before>
          <q-icon name="mdi-format-quote-open" :color="color" size="md" />
        </template>
      </q-input>

      <FrequencyInput
        :color="color"
        :model-value="0"
        :disable="disable"
        style="margin-bottom: 20px"
      />
      <q-checkbox
        v-if="!disable"
        v-model="model.disabled"
        :color="color"
        label="Disabled"
        :disable="disable"
        class="q-ml-lg"
      />
      <q-space />
      <q-btn
        v-if="!disable"
        :label="model.user_id === undefined ? 'Create' : 'Update'"
        type="submit"
        :color="color"
      />
    </div>
  </q-form>
</template>
