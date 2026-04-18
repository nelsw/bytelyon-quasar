<script setup lang="ts">
import { BotTypeIcon, BotTypeLabel, BotTypes } from 'src/types/model';
</script>

<template>
  <q-btn color="green-13" icon="mdi-plus" size="md" dense flat>
    <q-tooltip anchor="top end" self="bottom right" :offset="[10, 10]">
      New Bot
    </q-tooltip>
    <q-menu transition-show="jump-down" transition-hide="jump-up">
      <q-list>
        <q-item v-for="botType in BotTypes" :key="botType" :to="`/dashboard/${botType}`" active-class="text-green-13" clickable v-close-popup>
          <q-item-section class="q-pr-none" style="min-width: 32px" avatar>
            <q-icon :name="BotTypeIcon(botType)" />
          </q-item-section>
          <q-item-section>
            {{ BotTypeLabel(botType)}}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
