<script setup lang="ts">
import LogoImg from 'components/img/LogoImg.vue';
import PasswordInput from 'components/input/PasswordInput.vue';
import EmailInput from 'components/input/EmailInput.vue';
import type { AxiosBasicCredentials } from 'axios';
import { useRouter } from 'vue-router';
import { useTokenStore } from 'stores/token-store';
import { reactive } from 'vue';

type Credentials = AxiosBasicCredentials;

const $router = useRouter();
const $store = useTokenStore();
const credentials = reactive<Credentials>({ username: '', password: '' });

const onSubmit = async (): Promise<void> => {
  if (!(await $store.Login(credentials))) {
    return;
  }
  await $router.push({ name: 'home' });
  credentials.username = '';
  credentials.password = '';
};
</script>
<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-px-md text-center q-mt-lg">
      <LogoImg width="50%" />
      <div class="q-my-lg">
        <span class="text-h2 text-grey-5 text-weight-medium">ByteLyon</span>
      </div>
      <p class="text-h6 text-grey-6">
        Web
        <span class="q-gutter-sm">
          <span class="text-strike">Crawler</span>
          <span class="text-bold text-italic">Prowler</span>
        </span>
        <br />
        &
        <span class="q-gutter-sm">
          <span class="text-strike">Scraper</span>
          <span class="text-bold text-italic">Hunter</span>
        </span>
      </p>
      <q-form @submit.prevent="onSubmit" class="row">
        <EmailInput v-model="credentials.username" />
        <PasswordInput v-model="credentials.password" />
        <q-btn
          label="Login"
          color="indigo-14"
          class="q-my-md full-width text-weight-bold"
          size="lg"
          type="submit"
        />
      </q-form>
    </div>
  </q-page>
</template>
