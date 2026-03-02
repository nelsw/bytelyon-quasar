<script setup lang="ts">
import ForgotPassForm from 'components/form/ForgotPassForm.vue';
import { ref } from 'vue';

defineProps<{
  showReset?: boolean;
}>()

const model = defineModel<string>();
const dialog = ref(false);
</script>

<template>
  <q-input
    v-model="model"
    :rules="[(val: string) => (val && val.length > 0) || 'Password is required']"
    class="col-all"
    label="Password"
    lazy-rules="ondemand"
    name="password"
    type="password"
  >
    <template #prepend>
      <q-icon name="mdi-lock-outline" />
    </template>
    <template #append>
      <q-btn v-if="showReset" flat icon="mdi-lock-question" dense @click="dialog = true">
        <q-tooltip> Forgot Password </q-tooltip>
      </q-btn>
    </template>
  </q-input>
  <q-dialog v-model="dialog" backdrop-filter="blur(10px) saturate(150%)">
    <q-card style="max-width: 425px">
      <ForgotPassForm @close="dialog = false" />
    </q-card>
  </q-dialog>
</template>
