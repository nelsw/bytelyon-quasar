<script setup lang="ts">
import LogoImg from 'components/img/LogoImg.vue';
import EmailInput from 'components/input/EmailInput.vue';
import PasswordInput from 'components/input/PasswordInput.vue';
import { useRouter } from 'vue-router';
import { useTokenStore } from 'stores/token-store';
import { reactive } from 'vue';
import type { AxiosBasicCredentials } from 'axios';

const $router = useRouter();
const $auth = useTokenStore();

const credentials = reactive<AxiosBasicCredentials>({ username: '', password: '' });

const onSubmit = async (): Promise<void> => {
  if (await $auth.Login(credentials)) {
    await $router.push({name: 'Home'})
    credentials.username = '';
    credentials.password = '';
  }
};
</script>

<template>
  <div class="absolute-center text-center">
    <LogoImg width="100%" />
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
    <q-form v-if="$auth.IsInvalid()" @submit.prevent="onSubmit" class="row">
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

</template>
