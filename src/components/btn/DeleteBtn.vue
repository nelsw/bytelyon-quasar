<script setup lang="ts">

import XTooltip from 'components/tooltip/XTooltip.vue';

const emit = defineEmits<{
  select: [string];
  cancel: [void];
  delete: [string];
}>();

const props = defineProps<{
  id: string;
}>()

const model = defineModel<boolean>({
  default: false,
});

const handleClick = () => {
  emit('select', props.id);
  model.value = true;
}
</script>

<template>
  <q-btn color="negative" icon="mdi-delete-outline" size="sm" flat dense @click="handleClick">
    <x-tooltip text="Delete" />
  </q-btn>
  <q-dialog v-model="model" persistent>
    <q-card>
      <q-card-section class="row items-center text-h6"> Delete this record? </q-card-section>
      <q-card-actions>
        <q-btn class="full-width q-my-sm" label="Delete" color="negative" v-close-popup @click="emit('delete', props.id)"/>
        <q-btn class="full-width" flat label="Cancel" color="negative" v-close-popup @click="emit('cancel')"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
