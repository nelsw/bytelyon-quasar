<script setup lang="ts">
import { useNewsBotStore } from 'stores/news/bot-store';
import { date } from 'quasar';
import { onMounted } from 'vue';
import TrashBtn from 'components/btn/TrashBtn.vue';

const $store = useNewsBotStore();
onMounted($store.load);
</script>

<template>
  <q-expansion-item :disable="$store.loading" group="bots" hide-expand-icon expand-icon-toggle>
    <template #header="{ expanded, toggle }">
      <q-item-section avatar style="min-width: 25px; padding-right: 0">
        <q-icon name="mdi-newspaper" />
      </q-item-section>
      <q-item-section style="margin-left: 12px">
        <span class="items-center">
          <span class="text-subtitle1 text-weight-regular q-mr-xs">News</span>
        </span>
      </q-item-section>
      <q-item-section side>
        <div class="q-gutter-sm">
          <q-btn to="/news" color="green-13" icon="mdi-plus" size="md" dense flat>
            <q-tooltip>Create a News Bot</q-tooltip>
          </q-btn>
          <q-btn @click="$store.load" color="blue-13" icon="mdi-refresh" size="md" dense flat>
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
          <q-inner-loading :showing="$store.loading" size="sm" color="primary" />
        </div>
      </q-item-section>
    </template>
    <q-list dense>
      <q-separator inset />
      <q-item v-for="bot in $store.bots" :key="bot.id" :inset-level="0.5" :disable="$store.loading">
        <q-item-section>
          <q-item-label>
            <span class="q-ml-sm">
              {{ bot.target }}
              <q-tooltip>
                {{ date.formatDate(bot.workedAt, 'MM/DD/YY hh:mm a') }}
              </q-tooltip>
            </span>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="q-gutter-xs">
            <TrashBtn size="sm" tooltip="Delete News Bot" @click="$store.remove(bot.target)" />
            <q-btn
              :to="`/news/${bot.id}`"
              color="amber-13"
              icon="mdi-pencil-outline"
              size="sm"
              dense
              flat
            >
              <q-tooltip>Update News Bot</q-tooltip>
            </q-btn>
            <q-btn
              :to="`/news/results/${bot.id}`"
              color="white"
              icon="mdi-table"
              size="sm"
              dense
              flat
            >
              <q-tooltip>Show News Bot Results</q-tooltip>
            </q-btn>
          </div>
        </q-item-section>
      </q-item>

      <q-inner-loading :showing="$store.loading" dark size="sm" color="primary" />
    </q-list>
  </q-expansion-item>
</template>
