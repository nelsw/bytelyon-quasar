<script setup lang="ts">
import type { Bot } from 'src/types/model';
import BotForm from 'components/form/BotForm.vue';

defineProps<{
  bot: Bot;
}>();
</script>

<template>
  <div class="absolute-center">
    <BotForm :bot="bot" />
  </div>
</template>
