<script setup lang="ts">
import { BotTypeIcon, BotTypes } from 'src/types/model';
import { useRouter } from 'vue-router';

const $router = useRouter();
</script>

<template>
  <div class="full-width flex justify-center absolute-center q-gutter-md">
    <div class="full-width justify-center text-subtitle1">
      <div class="text-h3 text-center">
        Create a
        <q-icon name="mdi-new-box" size="2em" color="green-13" />
        Bot
      </div>
    </div>
    <q-card
      v-for="botType in BotTypes"
      :key="botType"
      class="cursor-pointer"
      style="width: 200px"
      @click="$router.push(`/dashboard/${botType}`)"
    >
      <q-card-section style="padding: 100px">
        <q-icon :name="BotTypeIcon(botType)" color="primary" size="5em" class="absolute-center" />
      </q-card-section>
      <q-separator />
      <q-card-actions class="flex justify-center">
        <div class="q-pa-md text-h6 text-capitalize">{{ botType }}</div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style scoped lang="scss"></style>
