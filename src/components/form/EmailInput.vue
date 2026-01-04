<script setup lang="ts">
const model = defineModel<string>();
</script>

<template>
  <q-input
    v-model="model"
    :rules="[
      (val: string) => (val && val.length > 0) || 'Email is required',
      (val: string) => /.+@.+\..+/.test(val) || 'Email must be valid',
    ]"
    class="col-12 text-weight-bold"
    label="Email"
    lazy-rules="ondemand"
    name="email"
    type="email"
    autofocus
  >
    <template #prepend>
      <q-icon name="mdi-email-outline" />
    </template>
  </q-input>
</template>
