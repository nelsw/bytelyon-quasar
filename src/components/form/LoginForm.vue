<script setup lang="ts">
import { reactive } from 'vue';
import { QForm } from 'quasar';
import { useTokenStore } from 'stores/token-store';
import type { AxiosBasicCredentials } from 'axios';
import { useRouter } from 'vue-router';
import LogoImg from 'components/img/LogoImg.vue';
import EmailInput from 'components/form/EmailInput.vue';
import PasswordInput from 'components/form/PasswordInput.vue';

const store = useTokenStore();
const router = useRouter();
const auth = reactive<AxiosBasicCredentials>({ username: '', password: '' });

const loginAsGuest = async () => {
  auth.username = 'demo@demo.com';
  auth.password = 'Demo123!';
  return await login();
};

const login = async () => {
  if (await store.login(auth)) {
    await router.push({ name: 'Dashboard' });
  }
};
</script>

<template>
  <div class="q-px-md text-center q-mt-lg">
    <LogoImg width="50%" random />
    <h2 style="margin: 30px 0" v-html="`ByteLyon`" />
    <p class="text-subtitle1 text-bold">Stop crawling; Start Prowling</p>
    <q-form @submit.prevent="login" class="row">
      <EmailInput v-model="auth.password" />
      <PasswordInput v-model="auth.password" />
      <q-btn
        label="Login"
        type="submit"
        size="lg"
        color="primary"
        class="col-12 full-width text-weight-bold"
      />
    </q-form>
    <q-form @submit.prevent="loginAsGuest">
      <q-btn
        flat
        label="Guest Login"
        type="submit"
        size="md"
        color="primary"
        class="col-12 q-mt-sm full-width text-weight-medium"
      />
    </q-form>
  </div>
</template>
