<script setup lang="ts">
import { type BotType, BotTypeIcon, BotTypeLabel } from 'src/types/model';
import { useQuasar } from 'quasar';
import { computed } from 'vue';
defineProps<{
  botType: BotType | undefined;
  botId: string | undefined;
  target: string;
}>();
const $q = useQuasar();
const fontSize = computed(() => {
  if ($q.screen.gt.sm) {
    return '14px';
  }
  return '11px';
});
const iconSize = computed(() => {
  if ($q.screen.gt.sm) {
    return '1em';
  }
  return '14px';
});
</script>

<template>
  <q-breadcrumbs
    :style="`font-size:${fontSize}`"
    :gutter="$q.screen.gt.sm ? 'sm' : 'xs'"
    class="flex items-center"
  >
    <template #separator>
      <q-icon :size="`${$q.screen.gt.sm ? 18 : 12}px`" name="mdi-chevron-right" color="grey-8" />
    </template>

    <q-breadcrumbs-el v-if="botType" :to="`/${botType}`">
      <template #default>
        <q-icon :name="BotTypeIcon(botType)" :size="iconSize" color="green-13" />
        <div v-if="$q.screen.gt.sm" class="text-grey-3 q-ml-sm">
          {{ BotTypeLabel(botType) }}
        </div>
      </template>
    </q-breadcrumbs-el>
    <q-breadcrumbs-el v-if="botType && botId" :to="`/${botType}/${botId}`">
      <template #default>
        <q-icon name="mdi-pencil-box" :size="iconSize" color="amber-13" />
        <div class="text-grey-3 q-ml-sm">
          {{ target }}
        </div>
      </template>
    </q-breadcrumbs-el>

    <q-breadcrumbs-el v-if="botType && botId" :to="`/${botType}/${botId}/results`">
      <template #default>
        <q-icon name="mdi-table-large" :size="iconSize" color="primary" />
        <div v-if="$q.screen.gt.sm" class="text-grey-3 q-ml-sm">Results</div>
      </template>
    </q-breadcrumbs-el>
  </q-breadcrumbs>
</template>
