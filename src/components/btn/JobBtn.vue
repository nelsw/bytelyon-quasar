<script setup lang="ts">
import { JobType } from 'src/types/job';
import { computed, onMounted, ref } from 'vue';
import { type Jerb, useJobStore } from 'stores/job-store';
import { clone, titleCase } from 'src/types/base';
import { FrequencyValueOptions, Unit, UnitOptions } from 'src/types/frequency';
import { QInput } from 'quasar';

const props = defineProps<{
  id: string;
  type: JobType;
}>();

const initJob = {
  id: props.id,
  name: '',
  type: props.type,
  frequency: {
    unit: Unit.MINUTE,
    value: 5,
  },
  results: new Map<string, string>(),
};

const job = ref<Jerb>(clone(initJob));
const resetJob = () => (job.value = clone(initJob));
const dialog = ref<boolean>(false);
const isNew = ref<boolean>(false);

const store = useJobStore();
const color = computed(() => `${isNew.value ? 'amber-14' : 'cyan-13'}`);
const icon = computed(() => `mdi-clock-${isNew.value ? 'remove' : 'check'}-outline`);
const frequencyOptions = computed(() => FrequencyValueOptions(job.value?.frequency?.unit));

const handleSave = async () => {
  await store.Save(job.value);
  handleCancel();
};
const handleDelete = async () => {
  await store.Delete(job.value);
  handleCancel();
};
const handleCancel = () => {
  dialog.value = false;
  resetJob();
};
onMounted(async () => {
  const j: Jerb | null = await store.find(props.id, props.type);
  isNew.value = j === null;
  job.value = clone(j ? j : initJob);
});
</script>

<template>
  <q-btn :color="color" :icon="icon" flat dense @click="dialog = true" />
  <q-dialog v-model="dialog" persistent>
    <q-card v-if="job" style="width: 250px; max-width: 25vw">
      <q-inner-loading :showing="store.loading" />
      <q-card-section class="items-center text-h6">
        <div class="flex justify-center q-gutter-sm">
          <div style="font-weight: bold">
            {{ titleCase(props.type === JobType.PLUNDER ? 'search' : props.type) }}
          </div>
          <div>Schedule</div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-input
          autofocus
          v-model="job.name"
          name="name"
          type="text"
          label="Name"
          color="primary"
          clearable
        />
        <div class="flex justify-between q-gutter-md">
          <q-select
            class="col"
            v-model="job.frequency.value"
            label="Value"
            name="value"
            color="primary"
            map-options
            emit-value
            :options="frequencyOptions"
          />
          <q-select
            class="col"
            v-model="job.frequency.unit"
            label="Unit"
            name="unit"
            color="primary"
            map-options
            emit-value
            :options="UnitOptions"
          />
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn @click="handleSave" label="Save" color="primary" class="full-width q-my-sm" />
        <q-btn @click="handleCancel" color="primary" class="full-width" label="Cancel" flat />
        <q-btn
          v-if="!isNew"
          @click="handleDelete"
          class="full-width q-my-sm"
          label="Delete"
          outline
          color="negative"
          size="sm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
