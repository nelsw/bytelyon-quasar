<script setup lang="ts">
import { QInput, useDialogPluginComponent } from 'quasar';
import { Job } from 'src/models/job';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { Unit, UnitOptions } from 'src/models/frequency';

interface Option {
  label: string;
  value: number;
}

const props = defineProps<{ job?: Job }>();
const model = reactive<Job>(new Job(props.job));
const color = computed(() => (props.job ? 'warning' : 'positive'));
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent<Job>();
const nameCleared = ref<boolean>(false);
const descCleared = ref<boolean>(false);

const minuteOptions: Option[] = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
];
const hourOptions: Option[] = Array(11)
  .fill(0)
  .map((_, i): Option => {
    return { label: i + 1 + '', value: i + 1 };
  });
const dayOptions: Option[] = Array(13)
  .fill(0)
  .map((_, i): Option => {
    return { label: i + 1 + '', value: i + 1 };
  });

const frequencyValueOptions = computed((): Option[] => {
  if (model.frequency.unit === Unit.DAY) {
    return minuteOptions;
  } else if (model.frequency.unit === Unit.HOUR) {
    return hourOptions;
  } else {
    return dayOptions;
  }
});

defineEmits({ ...useDialogPluginComponent.emitsObject });
watch(model, () => {
  if (nameCleared.value && descCleared.value) {
    return;
  }

  if (model.name === null) {
    nameCleared.value = true;
  } else {
    model.computeName(() => true);
  }

  if (model.description === null) {
    descCleared.value = true;
  } else {
    model.computeDesc(() => true);
  }
});
onMounted(() => {
  if (model.name === '') {
    model.name = model.computedName();
  }

  if (model.description === '') {
    model.description = model.computedDesc();
  }
});
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="min-width: 400px" flat>
      <q-card-section>
        <div class="text-h4 brand-font text-center">News Feed Details</div>
        <div class="text-subtitle brand-font-400 text-center">
          What are we searching for, and how often?
        </div>
        <q-select
          name="Keywords"
          label="Keywords"
          v-model="model.keywords"
          use-input
          use-chips
          multiple
          square
          hide-dropdown-icon
          new-value-mode="add-unique"
          :color="color"
        />
        <div class="flex justify-between q-gutter-md">
          <q-select
            class="col"
            v-model="model.frequency.value"
            label="Value"
            name="value"
            :color="color"
            map-options
            emit-value
            :options="frequencyValueOptions"
          />
          <q-select
            class="col"
            v-model="model.frequency.unit"
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
          v-model="model.name"
          name="name"
          type="text"
          label="Name"
          :color="color"
          clearable
        />
        <q-input
          autofocus
          v-model="model.description"
          name="description"
          type="text"
          label="Description"
          :color="color"
          clearable
        />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          class="full-width brand-font-700 q-mb-sm"
          :color="color"
          size="lg"
          label="Save"
          text-color="dark"
          @click="onDialogOK(model)"
        />
        <q-btn
          class="full-width brand-font-500"
          flat
          :color="color"
          size="lg"
          label="Cancel"
          @click="onDialogCancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
