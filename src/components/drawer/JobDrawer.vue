<script setup lang="ts">
import { type Job } from 'src/types/job';
import { watch } from 'vue';
import { type Bot } from 'src/types/base';

const props = defineProps<{
  jobs: Job[];
  bot: Bot;
}>();

const model = defineModel<boolean>({ required: true });

watch(props, () => {
  console.log(props.jobs);
});
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
          :active-class="`text-${bot.color}`"
          :to="`/${bot.type}/${j.ID}`"
        >
          <q-item-section> {{ j.Target }} </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
