<script setup lang="ts">
import { ref } from 'vue';

const softDelete = ref<boolean>(true);
const emit = defineEmits<{ delete: [void] }>();

const handleClick = () => {
  if (softDelete.value) {
    softDelete.value = false;
    setTimeout(() => (softDelete.value = true), 5000);
  } else {
    emit('delete');
    softDelete.value = true;
  }
};
</script>

<template>
  <q-btn
    @click="handleClick"
    :color="softDelete ? 'grey' : 'negative'"
    :icon="`mdi-close-circle${softDelete ? '-outline' : ''}`"
    size="sm"
    flat
    round
  />
</template>
