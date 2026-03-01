<script setup lang="ts">
import { QForm } from 'quasar';
import EmailInput from 'components/input/EmailInput.vue';
import PasswordInput from 'components/input/PasswordInput.vue';
import { reactive } from 'vue';
import { type Creds } from 'src/types/model';

const emit = defineEmits<{ submit: [Creds] }>();
const creds = reactive<Creds>({ username: '', password: '' });
</script>

<template>
  <div class="q-px-md text-center q-my-md">
    <div class="q-mb-md">
      <span class="text-h5 text-grey-5 text-weight-medium">Welcome Back!</span>
    </div>
    <q-form @submit.prevent="emit('submit', creds)" class="row">
      <EmailInput v-model="creds.username" />
      <PasswordInput v-model="creds.password" />
      <q-btn
        label="Login"
        type="submit"
        size="lg"
        color="primary"
        class="full-width text-weight-bold"
      />
    </q-form>
  </div>
</template>
