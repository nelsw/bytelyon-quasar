<script setup lang="ts">
import { useNodeStore } from 'stores/node-store';
import type { Bot } from 'src/types/model';

const emit = defineEmits<{ 'update:bot': [Bot]; }>();
const $nodes = useNodeStore();
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
        v-for="node in $nodes.model"
        :key="node.id"
        class="cursor-pointer"
        style="width: 200px"
        @click="emit('update:bot', node.bot)"
      >
        <q-card-section>
          <q-icon :name="node.icon" color="primary" size="4em" style="padding: 50px" />
        </q-card-section>
        <q-separator />
        <q-card-actions class="flex justify-center">
          <div class="q-pa-md text-h6 text-capitalize">{{ node.id }}</div>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped lang="scss"></style>
