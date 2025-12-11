<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useJobStore } from 'stores/job-store';
import { type Jerb, type JobResults } from 'src/types/job';
import { FrequencyValueOptions, Unit, UnitOptions } from 'src/types/frequency';
import { QInput } from 'quasar';
import { capitalize, clone } from 'src/types/base';

const props = defineProps<{
  job: Jerb;
}>();

const color = `green-14`;
const store = useJobStore();
const model = defineModel<boolean>({ default: false });

const unit = ref<Unit>(Unit.MINUTE);
const value = ref<number>(15);
const name = ref<string>('');

const frequencyOptions = computed(() => FrequencyValueOptions(unit.value));

const onSubmit = async () => {
  const data: Jerb = {
    id: props.job.id,
    name: name.value,
    type: props.job.type,
    frequency: {
      unit: unit.value,
      value: value.value,
    },
    results: {} as JobResults,
  };
  onCancel();
  await store.Create(data);
};

const onCancel = () => {
  name.value = '';
  unit.value = Unit.MINUTE;
  value.value = 15;
  model.value = false;
};

onMounted(() => {
  const job:Jerb = clone(props.job);
  unit.value = job.frequency.unit;
  value.value = job.frequency.value;
  name.value = job.name;
});
</script>

<template>
  <q-dialog v-model="model" persistent>
    <q-card>
      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="text-h6 text-center">New {{ capitalize(job.type) }}</div>
          <div class="flex justify-between q-gutter-md">
            <q-select
              class="col"
              v-model="value"
              label="Value"
              name="value"
              :color="color"
              map-options
              emit-value
              :options="frequencyOptions"
            />
            <q-select
              class="col"
              v-model="unit"
              label="Unit"
              name="unit"
              :color="color"
              map-options
              emit-value
              :options="UnitOptions"
            />
          </div>
          <q-input
            autofocus
            v-model="name"
            name="name"
            type="text"
            label="Name"
            :color="color"
            clearable
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
