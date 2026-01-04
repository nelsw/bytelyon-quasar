<script setup lang="ts">
import XTooltip from 'components/tooltip/XTooltip.vue';

const emit = defineEmits<{
  delete: [void];
}>();

const model = defineModel<boolean>({
  default: false,
});

defineProps<{
  disable: boolean;
}>();
</script>

<template>
  <q-btn
    color="negative"
    icon="mdi-delete-outline"
    outline
    dense
    @click="model = true"
    :disable="disable"
  >
    <x-tooltip v-if="!disable" text="Delete" />
  </q-btn>
  <q-dialog v-model="model" persistent>
    <q-card>
      <q-card-section class="row items-center text-h6"> Delete this record? </q-card-section>
      <q-card-actions>
        <q-form @submit="emit('delete')" style="width: 100%">
          <q-btn
            class="full-width q-my-sm"
            label="Delete"
            color="negative"
            v-close-popup
            type="submit"
            autofocus
          />
          <q-btn class="full-width" flat label="Cancel" color="negative" v-close-popup />
        </q-form>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
