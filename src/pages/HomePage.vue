<script setup lang="ts">
import { BotTypeIcon, BotTypes } from 'src/types/model';
const selected = defineModel<string>('selected');
</script>

<template>
  <q-page>
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
        @click="selected = b"
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
  </q-page>
</template>

<style scoped lang="scss"></style>
