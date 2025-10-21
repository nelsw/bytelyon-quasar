<script setup lang="ts">
import { reactive, ref } from 'vue';
import { QForm } from 'quasar';
import { useTokenStore } from 'stores/token-store';
import type { AxiosBasicCredentials } from 'axios';
import EmailInput from 'components/input/EmailInput.vue';
import PasswordInput from 'components/input/PasswordInput.vue';
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const tokenStore = useTokenStore();
const router = useRouter();
const myForm = ref<QForm | null>(null);
const auth = reactive<AxiosBasicCredentials>({
  username: '',
  password: '',
});

import { computed } from 'vue';
import { useRouter } from 'vue-router';
const token = computed(() => {
  return tokenStore.token ?? 'nil';
});

const login = async () => {
  if (!myForm.value || !(await myForm.value.validate())) {
    return;
  }

  if (!(await tokenStore.authorize(auth))) {
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'mdi-alert-circle-outline',
      message: 'Login failed; Check your credentials and try again.',
      position: 'top',
    });

    return;
  }

  $q.notify({
    color: 'positive',
    textColor: 'white',
    icon: 'mdi-check-circle-outline',
    message: 'Welcome back!',
    position: 'top',
  });
  console.log('authorization succeeded');
  await router.push({ path: '/dash' });
};
const logout = async () => {
  await tokenStore.logout()
}
</script>

<template>
  <div class="q-px-md text-center q-mt-lg">
    <h2>Tame the Wild Wild Web.</h2>

    <q-form @submit.prevent="login" ref="myForm" autofocus class="row">
      <EmailInput v-model="auth.username" class="col-12" />
      <PasswordInput v-model="auth.password" class="col-12 q-pt-sm q-pb-lg" />
      <SubmitBtn />
    </q-form>
    <q-btn
      @click="logout"
      label="Logout"
      type="submit"
      size="lg"
      color="primary"
      class="col-12 full-width brand-font-700 q-mt-sm"
      outline
    />
    <q-separator spaced />
    <q-input v-model="token" class="col-12"  name="token"/>

  </div>
</template>
