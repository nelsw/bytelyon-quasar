<script setup lang="ts">
import LogoImg from 'components/img/LogoImg.vue';
import PasswordInput from 'components/input/PasswordInput.vue';
import EmailInput from 'components/input/EmailInput.vue';
import GuestLoginBtn from 'components/btn/GuestLoginBtn.vue';
import { useUserStore } from 'src/stores/user';
import { ref } from 'vue';

const $user = useUserStore();
const email = ref('');
const pass = ref('');
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
    <q-form @submit.prevent="$user.login(email, pass)" class="row">
      <EmailInput v-model="email" />
      <PasswordInput v-model="pass"/>
      <q-btn
        label="Login"
        color="indigo-14"
        class="q-my-md full-width text-weight-bold"
        size="lg"
        type="submit"
      />
      <GuestLoginBtn
        class="full-width text-weight-bold"
        color="indigo-14"
        label="Guest Login"
        outline
      />
    </q-form>
  </div>
</template>
