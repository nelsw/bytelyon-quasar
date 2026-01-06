<script setup lang="ts">
import { type Bot, label } from 'src/types/base';
import ResetBtn from 'components/btn/ResetBtn.vue';
import CreateBtn from 'components/btn/CreateBtn.vue';

defineProps<Bot>();

const onSubmit = () => {};
const onReset = () => {};
</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset">
    <q-list dark>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-icon :name="icon" size="lg" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h5">{{ label(type) }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <slot />
      <q-separator spaced />
      <q-item>
        <q-item-section>
          <CreateBtn />
          <ResetBtn />
        </q-item-section>
      </q-item>
    </q-list>
  </q-form>
</template>
