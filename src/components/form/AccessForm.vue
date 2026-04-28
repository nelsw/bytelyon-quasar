<script setup lang="ts">
import EmailInput from 'components/input/EmailInput.vue';
import PasswordInput from 'components/input/PasswordInput.vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useTokenStore } from 'stores/token-store';
import { type AxiosBasicCredentials } from 'axios';

type Credentials = AxiosBasicCredentials;

const $router = useRouter();
const $store = useTokenStore();
const credentials = reactive<Credentials>({ username: '', password: '' });

const onSubmit = async (): Promise<void> => {
  if (!await $store.Login(credentials)) {
    return;
  }
  await $router.push({name:'home'});
  credentials.username = '';
  credentials.password = '';
};

</script>

<template>
  <div class="q-px-md text-center q-my-md">
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
</template>
