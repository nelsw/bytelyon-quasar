<script setup lang="ts">
import { type Bot } from 'src/types/model';

defineProps<{
  bot: Bot;
}>();
</script>

<template>
  <q-btn
    class="full-width"
    :label="bot.id === '' ? 'Create' : 'Update'"
    :color="bot.id === '' ? 'green-13' : 'amber-13'"
    v-close-popup
    type="submit"
    text-color="dark"
    size="lg"
  />
</template>
