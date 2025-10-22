<script setup lang="ts">
import { reactive } from 'vue';
import { QForm } from 'quasar';
import { useTokenStore } from 'stores/token-store';
import type { AxiosBasicCredentials } from 'axios';
import { useRouter } from 'vue-router';

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
    await router.push({ path: '/dashboard' });
  }
};
</script>

<template>
  <div class="q-px-md text-center q-mt-lg">
    <img src="~assets/logo.svg" alt="Logo" width="50%" />
    <h2 style="margin: 30px 0">ByteLyon</h2>
    <q-form @submit.prevent="login" class="row">
      <q-input
        v-model="auth.username"
        :rules="[
          (val: string) => (val && val.length > 0) || 'Email is required',
          (val: string) => /.+@.+\..+/.test(val) || 'Email must be valid',
        ]"
        class="col-12 text-weight-bold"
        label="Email"
        lazy-rules="ondemand"
        name="email"
        type="email"
        autofocus
      >
        <template v-slot:prepend>
          <q-icon name="mdi-email-outline" />
        </template>
      </q-input>
      <q-input
        v-model="auth.password"
        :rules="[(val: string) => (val && val.length > 0) || 'Password is required']"
        class="col-12 q-mb-sm"
        label="Password"
        lazy-rules="ondemand"
        name="password"
        type="password"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-lock-outline" />
        </template>
      </q-input>
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
