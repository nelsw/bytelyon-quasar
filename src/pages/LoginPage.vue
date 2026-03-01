<script setup lang="ts">
import SignupForm from 'components/form/SignupForm.vue';
import LogoImg from 'components/img/LogoImg.vue';
import LoginForm from 'components/form/LoginForm.vue';
import { ref } from 'vue';
import type { Creds, Email } from 'src/types/model';
import { useTokenStore } from 'stores/token-store';
import { useRouter } from 'vue-router';

const $router = useRouter();
const $store = useTokenStore();
const dialog = ref<boolean>(false);

const onSignup = async (email: Email) => {
  await $store.signup(email);
};

const onLogin = async (creds: Creds) => {
  if (await $store.login(creds)) {
    await $router.push({ name: 'dashboard' });
  }
};
</script>
<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-px-md text-center q-mt-lg">
      <LogoImg width="50%" />
      <div class="q-my-lg">
        <span class="text-h2 text-grey-5 text-weight-medium">ByteLyon</span>
      </div>
      <p class="text-h6 text-grey-6">Browser Based (Playwright)<br />Web Crawling & Scraping</p>
      <SignupForm @submit="onSignup" @dialog="dialog = true" />
      <q-dialog v-model="dialog" backdrop-filter="blur(10px) saturate(150%)">
        <q-card style="min-width: 350px">
          <LoginForm @submit="onLogin" />
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
