<script setup lang="ts">
import { ref } from 'vue';
import { BotTypeIcon, BotTypeLabel, BotTypes } from 'src/types/model';

const model = ref(false);
</script>

<template>
  <q-btn color="green-13" icon="mdi-plus" size="md" dense flat>
    <q-tooltip v-model="model" anchor="center left" self="center right" :offset="[10, 10]"
      >New Bot</q-tooltip
    >
    <q-menu transition-show="jump-down" transition-hide="jump-up">
      <q-list>
        <q-item v-for="botType in BotTypes" :key="botType" :to="`/${botType}`" clickable v-close-popup>
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

<style scoped lang="scss"></style>
