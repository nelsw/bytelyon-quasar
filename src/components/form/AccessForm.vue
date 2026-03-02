<script setup lang="ts">
import { QForm } from 'quasar';
import EmailInput from 'components/input/EmailInput.vue';
import PasswordInput from 'components/input/PasswordInput.vue';
import { reactive } from 'vue';
import { type Creds } from 'src/types/model';

const emit = defineEmits<{
  login: [Creds];
  signup: [Creds];
}>();
const creds = reactive<Creds>({ username: '', password: '' });
</script>

<template>
  <div class="q-px-md text-center q-my-md">
    <q-form @submit.prevent="emit('signup', creds)" class="row">
      <EmailInput v-model="creds.username" />
      <PasswordInput v-model="creds.password" show-reset />
      <q-btn
        type="submit"
        label="Login"
        color="indigo-14"
        class="q-my-md full-width text-weight-bold"
        size="lg"
        @click.prevent="emit('login', creds)"
      />
      <q-btn
        label="Sign up"
        size="md"
        color="green-14"
        class="full-width"
        outline
        @click.prevent="emit('signup', creds)"
      />
    </q-form>
  </div>
</template>
