<script setup lang="ts">
import { date } from 'quasar';
import { onMounted } from 'vue';
import { useSitemapBotStore } from 'stores/sitemap/bot-store';
import { domain } from 'src/types/base';
import TrashBtn from 'components/btn/TrashBtn.vue';
import { BotType, BotTypeIcon, BotTypeLabel } from 'src/types/model';

const bot = BotType.Sitemap;
const $store = useSitemapBotStore();

onMounted($store.Load);
</script>

<template>
  <q-expansion-item
    :disable="$store.busy"
    :icon="BotTypeIcon(bot)"
    :label="BotTypeLabel(bot)"
    group="bots"
  >
    <q-list dense>
      <q-separator inset />
      <q-item
        v-for="bot in $store.model"
        :key="bot.id"
        :inset-level="0.1"
        :disable="$store.busy"
        class="q-mr-xs"
      >
        <q-item-section>
          <q-item-label>
            {{ domain(bot.target) }}
            <q-tooltip>
              {{ date.formatDate(bot.workedAt, 'MM/DD/YY hh:mm a') }}
            </q-tooltip>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="q-gutter-xs">
            <TrashBtn size="sm" tooltip="Delete Search Bot" @click="$store.Remove(bot.target)" />
            <q-btn
              :to="`/sitemap/${bot.id}`"
              color="amber-13"
              icon="mdi-pencil"
              size="sm"
              dense
              flat
            >
              <q-tooltip>Update News Bot</q-tooltip>
            </q-btn>
            <q-btn
              :to="`/sitemap/results/${bot.id}`"
              color="white"
              icon="mdi-table"
              size="sm"
              dense
              flat
            >
              <q-tooltip>Show Sitemap Bot Results</q-tooltip>
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
      <q-inner-loading :showing="$store.busy" dark size="sm" color="primary" />
    </q-list>
  </q-expansion-item>
</template>
