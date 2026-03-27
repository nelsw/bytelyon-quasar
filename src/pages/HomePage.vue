<script setup lang="ts">
import { useNodeStore } from 'stores/node-store';
import type { Bot } from 'src/types/model';
import { useQuery } from 'src/composable/useQuery';

const emit = defineEmits<{ 'update:bot': [Bot] }>();
const $nodes = useNodeStore();
useQuery();

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
      v-for="node in $nodes.model"
      :key="node.id"
      class="cursor-pointer"
      style="width: 200px"
      @click="emit('update:bot', node.bot)"
    >
      <q-card-section style="padding: 100px">
        <q-icon :name="node.icon" color="primary" size="5em" class="absolute-center" />
      </q-card-section>
      <q-separator />
      <q-card-actions class="flex justify-center">
        <div class="q-pa-md text-h6 text-capitalize">{{ node.id }}</div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style scoped lang="scss"></style>
