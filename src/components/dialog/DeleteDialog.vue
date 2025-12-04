<script setup lang="ts">
const emit = defineEmits<{ delete: [void]; }>();
const model = defineModel<boolean>({ default: false });
</script>

<template>
  <q-dialog v-model="model" persistent>
    <q-card>
      <q-card-section class="row items-center text-h6">
        <slot/>
      </q-card-section>
      <q-card-actions>
        <q-btn
          class="full-width q-my-sm"
          label="Delete"
          color="negative"
          v-close-popup
          @click="emit('delete');model=false;"
        />
        <q-btn
          class="full-width"
          flat
          label="Cancel"
          color="negative"
          v-close-popup
          @click="model=false"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
