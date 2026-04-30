<script setup lang="ts">
import LogoImg from 'components/img/LogoImg.vue';
import PasswordInput from 'components/input/PasswordInput.vue';
import EmailInput from 'components/input/EmailInput.vue';
import { useTokenStore } from 'stores/token-store';
import { ref } from 'vue';

const $auth = useTokenStore();
const credentials = ref({ username: '', password: '' });
</script>
<template>
    <div class="absolute-center q-px-md">
      <div class="text-center">
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

      </div>
      <q-form @submit.prevent="$auth.Login(credentials)" class="row">
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
