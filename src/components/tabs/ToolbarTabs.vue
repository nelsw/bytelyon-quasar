<script setup lang="ts">
import { BotTypeIcon, BotTypes } from 'src/types/model';
import { onMounted } from 'vue';
import { useRouteX } from 'src/composable/useRoutex';

const $x = useRouteX();

const model = defineModel<string>();

onMounted(() => {
  if ($x.botParam() !== undefined) {
    model.value = $x.botParam();
  } else if ($x.name()?.match(/^(search|sitemap|news)$/)) {
    model.value = $x.name();
  }
});
</script>

<template>
  <q-tabs v-model="model" class="text-grey-5" indicator-color="primary" shrink stretch inline-label>
    <q-tab
      v-for="b in BotTypes"
      :icon="BotTypeIcon(b)"
      :key="b"
      :label="b"
      :name="b"
      @click="$x.to({ name: 'bot', params: { bot: b } })"
    />
  </q-tabs>
</template>
