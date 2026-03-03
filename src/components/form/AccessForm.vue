<script setup lang="ts">
import { QForm } from 'quasar';
import EmailInput from 'components/input/EmailInput.vue';
import PasswordInput from 'components/input/PasswordInput.vue';
import { reactive } from 'vue';
import { type Creds } from 'src/types/model';
import { useRouter } from 'vue-router';
import { useTokenStore } from 'stores/token-store';

const $router = useRouter();
const $store = useTokenStore();
const creds = reactive<Creds>({ username: '', password: '' });

const clearCreds = () => {
  creds.username = '';
  creds.password = '';
};

const onLogin = async (): Promise<void> => {
  if (await $store.login(creds)) {
    await $router.push('/dashboard');
    clearCreds();
  }
};

const onSignup = async (): Promise<void> => {
  if (await $store.signup(creds)) {
    clearCreds();
  }
};
</script>

<template>
  <div class="q-px-md text-center q-my-md">
    <q-form class="row">
      <EmailInput v-model="creds.username" />
      <PasswordInput v-model="creds.password" show-reset />
      <q-btn
        label="Login"
        color="indigo-14"
        class="q-my-md full-width text-weight-bold"
        size="lg"
        @click.prevent="onLogin"
      />
      <q-btn
        label="Sign up"
        size="md"
        color="green-14"
        class="full-width"
        outline
        @click.prevent="onSignup"
      />
    </q-form>
  </div>
</template>
