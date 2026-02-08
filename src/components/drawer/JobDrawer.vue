<script setup lang="ts">
import type { Bots } from 'src/types/model';

defineProps<{
  bots: Bots;
}>();

const model = defineModel<boolean>({ required: true });
</script>

<template>
  <q-drawer v-model="model" side="left" bordered :width="300" :breakpoint="600">
    <q-scroll-area style="height: 100%">
      <q-list dense separator class="text-subtitle2">
        <q-item
          v-for="b in bots"
          :key="b.ID"
          clickable
          v-ripple
          active
          active-class="primary"
          :to="`/${b.Type}/${b.ID}`"
        >
          <q-item-section> {{ b.Target }} </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
