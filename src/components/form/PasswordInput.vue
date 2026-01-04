<script setup lang="ts">
const model = defineModel<string>();
</script>

<template>
  <q-input
    v-model="model"
    :rules="[(val: string) => (val && val.length > 0) || 'Password is required']"
    class="col-12 q-mb-sm"
    label="Password"
    lazy-rules="ondemand"
    name="password"
    type="password"
  >
    <template #prepend>
      <q-icon name="mdi-lock-outline" />
    </template>
  </q-input>
</template>
