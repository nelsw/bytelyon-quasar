<script setup lang="ts">
import { date } from 'quasar';
import { type BotType, BotTypeIcon, BotTypeLabel } from 'src/types/model';
import { useBotStore } from 'stores/bot-store';

defineProps<{
  botType: BotType;
}>();

const $store = useBotStore();
</script>

<template>
  <q-expansion-item
    @before-show="$store.load(botType)"
    :icon="BotTypeIcon(botType)"
    :label="BotTypeLabel(botType)"
    group="bots"
  >
    <q-list dense>
      <q-separator inset />
      <q-item
        v-for="e in $store.model.get(botType)?.e.sort((a, b) => a.v.target.localeCompare(b.v.target))"
        :key="e.k"
        :disable="$store.busy"
        :to="`/dashboard/${e.v.type}/${e.v.id}/results`"
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>
            {{ e.v.target }}
            <q-tooltip>
              {{ date.formatDate(e.v.workedAt, 'MM/DD/YY hh:mm a') }}
            </q-tooltip>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-inner-loading :showing="$store.busy" dark size="sm" color="primary" />
    </q-list>
  </q-expansion-item>
</template>
