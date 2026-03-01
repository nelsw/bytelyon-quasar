<script setup lang="ts">
import EmailInput from 'components/input/EmailInput.vue';
import { QForm } from 'quasar';
import { reactive } from 'vue';
import { type Email } from 'src/types/model';

const emit = defineEmits<{ submit: [Email]; dialog: [void] }>();
const email = reactive<Email>({ ID: '' });
</script>

<template>
  <q-form @submit.prevent="emit('submit', email)" class="row">
    <EmailInput v-model="email.ID" />
    <q-btn
      label="Get started"
      type="submit"
      size="lg"
      color="primary"
      class="full-width text-weight-bold"
    />
  </q-form>
  <q-btn
    label="Login"
    color="primary"
    class="q-my-md full-width"
    outline
    @click.prevent="emit('dialog')"
  />
</template>
