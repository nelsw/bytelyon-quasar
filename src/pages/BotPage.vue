<script setup lang="ts">
import { computed, onMounted } from 'vue';
import BotForm from 'components/form/BotForm.vue';
import { type Bot, NewBot } from 'src/types/model';
import { useRouteX } from 'src/composable/useRoutex';
import { useBotStore } from 'stores/v2/bot-store';

const $store = useBotStore();
const $x = useRouteX();

const bot = computed(() => {
  if ($x.id() > 0) {
    return $store.Find($x.botType(), $x.id()) as Bot;
  } else {
    return NewBot($x.botType(), '', [], 1);
  }
});
onMounted(() => {

});
</script>

<template>
  <div class="absolute-center">
    <BotForm :bot="bot" />
  </div>
</template>
