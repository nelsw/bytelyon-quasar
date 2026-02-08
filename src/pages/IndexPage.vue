<script setup lang="ts">
import { useRouter } from 'vue-router';
import { BotTypeIcon, BotTypes } from 'src/types/model';
const $r = useRouter();
</script>

<template>
  <div class="full-width flex justify-center absolute-center q-gutter-md">
    <div class="full-width justify-center text-subtitle1">
      <div class="text-h3 text-center">
        Create a
        <q-icon name="mdi-new-box" size="2em" color="green-13" />
        bot
      </div>
    </div>
    <q-card
      v-for="b in BotTypes"
      :key="b"
      class="cursor-pointer"
      style="width: 200px"
      @click="$r.push({ name: 'bot', params: { bot: b } })"
    >
      <q-card-section>
        <q-icon :name="BotTypeIcon(b)" color="primary" size="4em" style="padding: 50px" />
      </q-card-section>
      <q-separator />
      <q-card-actions class="flex justify-center">
        <div class="q-pa-md text-h6 text-capitalize">{{ b }}</div>
      </q-card-actions>
    </q-card>
  </div>
</template>
