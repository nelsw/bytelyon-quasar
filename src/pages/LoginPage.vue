<script setup lang="ts">
import LogoImg from 'components/img/LogoImg.vue';
import AccessForm from 'components/form/AccessForm.vue';
import type { Creds } from 'src/types/model';
import { useTokenStore } from 'stores/token-store';
import { useRouter } from 'vue-router';

const $router = useRouter();
const $store = useTokenStore();

const onSignup = async (creds: Creds) => {
  await $store.signup(creds);
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
      <AccessForm @login="onLogin" @signup="onSignup" />
    </div>
  </q-page>
</template>
