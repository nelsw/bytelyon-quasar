<script setup lang="ts">
import { computed } from 'vue';
import { useRouteHelper } from 'src/composable/routeHelper';
import BotForm from 'components/form/BotForm.vue';

const r = useRouteHelper();

const isNotResultPage = computed(() => r.resultParam() < 1);
</script>

<template>
  <div v-if="isNotResultPage" class="absolute-center">
    <BotForm :bot="r.bot()" />
  </div>
</template>
