<script setup lang="ts">
import type { ValidationRule } from 'quasar';
const model = defineModel<string>({
  required: true,
});
const rules: ValidationRule[] = [
  (val: string) => (val && val.length > 0) || 'Email is required',
  (val: string) => /.+@.+\..+/.test(val) || 'Email must be valid',
];
</script>

<template>
  <q-input
    v-model="model"
    :lazy-rules="true"
    :rules="rules"
    class="brand-font-400"
    style="font-weight: 700"
    label="Email"
    name="email"
    type="email"
  >
    <template v-slot:prepend>
      <q-icon name="mdi-email-outline" />
    </template>
  </q-input>
</template>
