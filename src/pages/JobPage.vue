<script setup lang="ts">
import { useRouteHelper } from 'src/composable/routeHelper';
import BotForm from 'components/form/BotForm.vue';
import { useBotStore } from 'stores/v2/bot-store';

const r = useRouteHelper();
const store = useBotStore();
</script>

<template>
  <div v-if="r.resultParam() < 1" class="absolute-center">
    <BotForm :bot="r.bot()" :job="store.find(r.jobParam(), r.bot().jobType)" />
  </div>
</template>
