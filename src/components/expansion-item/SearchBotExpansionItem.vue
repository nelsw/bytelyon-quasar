<script setup lang="ts">
import { date } from 'quasar';
import { onMounted } from 'vue';
import { useSearchBotStore } from 'stores/search/bot-store';
import TrashBtn from 'components/btn/TrashBtn.vue';

const $store = useSearchBotStore();

onMounted($store.Load);
</script>

<template>
  <q-expansion-item :disable="$store.busy" group="bots" hide-expand-icon expand-icon-toggle>
    <template #header="{ expanded, toggle }">
      <q-item-section avatar style="min-width: 25px; padding-right: 0">
        <q-icon name="mdi-web" />
      </q-item-section>
      <q-item-section style="margin-left: 12px">
        <span class="text-subtitle1 text-weight-regular q-mr-xs">Search</span>
      </q-item-section>

      <q-item-section side>
        <div class="q-gutter-sm">
          <q-btn to="/search" color="green-13" icon="mdi-plus" size="md" dense flat>
            <q-tooltip>Create a News Bot</q-tooltip>
          </q-btn>
          <q-btn @click="$store.Load" color="blue-13" icon="mdi-refresh" size="md" dense flat>
            <q-tooltip>Refresh News Bots</q-tooltip>
          </q-btn>
          <q-btn
            @click="toggle"
            :icon="`mdi-chevron-${expanded ? 'up' : 'down'}`"
            color="white"
            size="md"
            dense
            flat
          >
            <q-tooltip>Show News Bot Results</q-tooltip>
          </q-btn>
          <q-inner-loading :showing="$store.busy" size="sm" color="primary" />
        </div>
      </q-item-section>
    </template>
    <q-list dense>
      <q-separator inset />
      <q-item
        v-for="bot in $store.model"
        :key="bot.id"
        :inset-level="0.5"
        :disable="$store.busy"
        class="q-mr-xs"
      >
        <q-item-section>
          <q-item-label>
            {{ bot.target }}
            <q-tooltip>
              {{ date.formatDate(bot.workedAt, 'MM/DD/YY hh:mm a') }}
            </q-tooltip>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="q-gutter-xs">
            <TrashBtn size="sm" tooltip="Delete Search Bot" @click="$store.Remove(bot.target)" />
            <q-btn
              :to="`/search/${bot.id}`"
              color="amber-13"
              icon="mdi-pencil"
              size="sm"
              dense
              flat
            >
              <q-tooltip>Update News Bot</q-tooltip>
            </q-btn>
            <q-btn
              :to="`/search/results/${bot.id}`"
              color="white"
              icon="mdi-table"
              size="sm"
              dense
              flat
            >
              <q-tooltip>Show Search Bot Results</q-tooltip>
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
      <q-inner-busy :showing="$store.busy" dark size="xs" color="primary" />
    </q-list>
  </q-expansion-item>
</template>
