<!--<script setup lang="ts">-->
<!--import type { JobType } from 'src/types/job';-->
<!--import { type Job, type JobResults } from 'src/types/job';-->
<!--import { capitalize } from 'src/types/base';-->
<!--import { Unit, UnitOptions } from 'src/types/frequency';-->
<!--import { QInput } from 'quasar';-->
<!--import XTooltip from 'components/tooltip/XTooltip.vue';-->
<!--import { useJobStore } from 'stores/job-store';-->
<!--import { computed, onMounted, ref } from 'vue';-->
<!--const props = defineProps<{-->
<!--  id: string;-->
<!--  type: JobType;-->
<!--}>();-->

<!--const isNew = ref<boolean>(false);-->
<!--const color = computed(() => `${isNew.value ? 'amber-14' : 'cyan-13'}`);-->
<!--const icon = computed(() => `mdi-clock-${isNew.value ? 'remove' : 'check'}-outline`);-->

<!--const store = useJobStore();-->
<!--const model = defineModel<boolean>({ default: false });-->

<!--const unit = ref<Unit>(Unit.MINUTE);-->
<!--const value = ref<number>(15);-->
<!--const name = ref<string>('');-->

<!--const frequencyOptions = computed(() => FrequencyValueOptions(unit.value));-->

<!--const onSubmit = async () => {-->
<!--  const data: Job = {-->
<!--    id: props.id,-->
<!--    name: name.value,-->
<!--    type: props.type,-->
<!--    frequency: {-->
<!--      unit: unit.value,-->
<!--      value: value.value,-->
<!--    },-->
<!--    results: {} as JobResults,-->
<!--  };-->
<!--  onCancel();-->
<!--  await store.Create(data);-->
<!--};-->

<!--const onCancel = () => {-->
<!--  name.value = '';-->
<!--  unit.value = Unit.MINUTE;-->
<!--  value.value = 15;-->
<!--  model.value = false;-->
<!--};-->

<!--const onDelete = async () => {-->
<!--  onCancel();-->
<!--  await store.remove(props.id);-->
<!--}-->

<!--onMounted(async () => {-->
<!--  const job: Job | null = await store.find(props.id, props.type);-->
<!--  isNew.value = job === null;-->
<!--  unit.value = job?.frequency?.unit ?? Unit.MINUTE;-->
<!--  value.value = job?.frequency?.value ?? 15;-->
<!--  name.value = job?.name ?? '';-->
<!--});-->
<!--</script>-->

<!--<template>-->
<!--  <q-btn :color="color" :icon="icon" size="sm" flat dense @click="model = true">-->
<!--    <x-tooltip text="Schedule" />-->
<!--  </q-btn>-->
<!--  <q-dialog v-model="model" persistent>-->
<!--    <q-card>-->
<!--      <q-form @submit="onSubmit">-->
<!--        <q-card-section>-->
<!--          <div class="text-h5 text-center">{{ capitalize(type) }} Scheduler</div>-->
<!--          <q-input-->
<!--            autofocus-->
<!--            v-model="name"-->
<!--            name="name"-->
<!--            type="text"-->
<!--            label="Name"-->
<!--            :color="color"-->
<!--            clearable-->
<!--          />-->
<!--          <div class="flex justify-between q-gutter-md">-->
<!--            <q-select-->
<!--              class="col"-->
<!--              v-model="value"-->
<!--              label="Value"-->
<!--              name="value"-->
<!--              :color="color"-->
<!--              map-options-->
<!--              emit-value-->
<!--              :options="frequencyOptions"-->
<!--            />-->
<!--            <q-select-->
<!--              class="col"-->
<!--              v-model="unit"-->
<!--              label="Unit"-->
<!--              name="unit"-->
<!--              :color="color"-->
<!--              map-options-->
<!--              emit-value-->
<!--              :options="UnitOptions"-->
<!--            />-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--        <q-card-actions>-->
<!--          <q-btn-->
<!--            class="full-width"-->
<!--            label="Save"-->
<!--            text-color="black"-->
<!--            :color="color"-->
<!--            v-close-popup-->
<!--            type="submit"-->
<!--          />-->
<!--          <q-btn class="full-width q-mt-sm" label="Cancel" :color="color" @click="onCancel" flat />-->
<!--          <q-btn-->
<!--            v-if="!isNew"-->
<!--            @click="onDelete"-->
<!--            class="full-width q-my-sm"-->
<!--            label="Delete"-->
<!--            outline-->
<!--            color="negative"-->
<!--            size="sm"-->
<!--          />-->
<!--        </q-card-actions>-->
<!--      </q-form>-->
<!--    </q-card>-->
<!--  </q-dialog>-->
<!--</template>-->
