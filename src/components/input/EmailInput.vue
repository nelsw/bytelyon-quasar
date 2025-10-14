<script setup lang="ts">
import type { ValidationRule } from 'quasar';
const model = defineModel<string>({
  required: true,
});
const emailRules: ValidationRule[] = [
  (val: string) => (val && val.length > 0) || 'Email is required',
  (val: string) => /.+@.+\..+/.test(val) || 'Email must be valid',
];
</script>

<template>
  <q-input v-model="model" type="email" label="Email" name="email" outlined :rules="emailRules" class="brand-font-400">
    <template v-slot:prepend>
      <q-icon name="mdi-email-outline" />
    </template>
  </q-input>
</template>
