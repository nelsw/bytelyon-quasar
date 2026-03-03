<script setup lang="ts">
import { QForm } from 'quasar';
import PasswordInput from 'components/input/PasswordInput.vue';
import { reactive } from 'vue';
import { useTokenStore } from 'stores/token-store';
import type { AxiosBasicCredentials } from 'boot/axios';

const emit = defineEmits<{ ok: [boolean] }>();
const $store = useTokenStore();
const model = reactive<AxiosBasicCredentials>({ username: '', password: '' });
const onSubmit = async () => emit('ok', await $store.changePass(model));
</script>

<template>
  <div class="q-px-md text-center q-my-md">
    <div class="q-mb-md">
      <span class="text-h5 text-grey-5 text-weight-medium"> Create a new password </span>
    </div>
    <q-form @submit.prevent="onSubmit" class="row">
      <PasswordInput v-model="model.password" />
      <q-btn
        label="Save Password"
        type="submit"
        size="lg"
        color="primary"
        class="full-width text-weight-bold"
      />
    </q-form>
  </div>
</template>
