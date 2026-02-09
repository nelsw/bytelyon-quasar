<script setup lang="ts">
import type { BotType } from 'src/types/model';
import { BotTypeIcon, BotTypes, NewBot } from 'src/types/model';
import { useRouter } from 'vue-router';
import BotForm from 'components/form/BotForm.vue';
const $r = useRouter();
const selected = defineModel<string>('selected');
</script>

<template>
  <q-page>
    <div v-if="selected === ''">
      <div class="full-width flex justify-center absolute-center q-gutter-md">
        <div class="full-width justify-center text-subtitle1">
          <div class="text-h3 text-center">
            Create a
            <q-icon name="mdi-new-box" size="2em" color="green-13" />
            Bot
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
    </div>
    <div v-else>
      <div class="absolute-center">
        <BotForm :bot="NewBot(selected as BotType)" />
      </div>
    </div>
  </q-page>
</template>
