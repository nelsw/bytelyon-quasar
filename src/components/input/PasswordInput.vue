<script setup lang="ts">
const model = defineModel<string>({
  required: true,
});
</script>

<template>
  <q-input v-model="model" type="password" label="Password" name="password" outlined class="brand-font-400">
    <template v-slot:prepend>
      <q-icon name="mdi-lock-outline" />
    </template>
  </q-input>
</template>

<style scoped></style>
