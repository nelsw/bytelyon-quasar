<script setup lang="ts">
import UpdatePassForm from 'components/form/UpdatePassForm.vue';

const model = defineModel<boolean>({ required: true });
const onOk = (ok:boolean): void => {
  if (ok) {
    model.value = false;
    // redirect
  }
}
</script>

<template>
  <q-dialog v-model="model" backdrop-filter="blur(10px) saturate(150%)" persistent>
    <q-card style="min-width: 350px">
      <UpdatePassForm @ok="onOk" />
    </q-card>
  </q-dialog>
</template>
