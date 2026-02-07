<script setup lang="ts">
import { type Job } from 'src/types/model';
import { type Bot } from 'src/types/base';

defineProps<{
  jobs: Job[];
  bot: Bot | undefined;
}>();

const model = defineModel<boolean>({ required: true });
</script>

<template>
  <q-drawer v-model="model" side="left" bordered :width="233" :breakpoint="600">
    <q-scroll-area style="height: 100%">
      <q-list dense separator class="text-subtitle2">
        <q-item
          v-for="j in jobs"
          :key="j.ID"
          clickable
          v-ripple
          active
          :active-class="`text-${bot?.color}`"
          :to="`/${bot?.type}/${j.ID}`"
        >
          <q-item-section> {{ j.Target }} </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
