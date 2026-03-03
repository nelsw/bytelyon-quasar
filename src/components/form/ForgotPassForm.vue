<script setup lang="ts">
import EmailInput from 'components/input/EmailInput.vue';
import { QForm } from 'quasar';
import { useTokenStore } from 'stores/token-store';
import { reactive } from 'vue';
import type { AxiosBasicCredentials } from 'boot/axios';

const emit = defineEmits<{ close: [boolean] }>();
const model = reactive<AxiosBasicCredentials>({ username: '', password: '' });
const $store = useTokenStore();
const onSubmit = async () => emit('close', await $store.forgotPass(model));
</script>

<template>
  <div class="q-px-md text-center q-my-md">
    <div class="q-mb-md">
      <div>
        <q-responsive :ratio="1">
        <img
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTZuNG1wYmR1bXgwMnZ5Znc3OWp3c25vYWNqZTY3cG16bW52cjVoayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fpdql5AgW7ziM/giphy.gif"
          alt="yeah-blew-it"
        />
        </q-responsive>
      </div>

    </div>
    <q-form @submit.prevent="onSubmit" class="row">
      <EmailInput v-model="model.username" />
      <q-btn
        label="Send a resent link"
        type="submit"
        size="lg"
        color="primary"
        class="full-width text-weight-bold"
      />
    </q-form>
  </div>
</template>
