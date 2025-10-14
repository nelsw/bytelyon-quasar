<script setup lang="ts">
import type { RippleValue } from 'quasar';

const ripple:RippleValue = {
  center: true,
}
</script>

<template>
  <q-btn
    label="Login"
    type="submit"
    size="lg"
    color="primary"
    class="col-12 full-width brand-font-700"
    :ripple="ripple"
  />
</template>

<style scoped></style>
