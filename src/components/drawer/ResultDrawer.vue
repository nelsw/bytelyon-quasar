<script setup lang="ts">
import type { Results } from 'src/types/model';
import { useRouteX } from 'src/composable/useRoutex';

defineProps<{
  results: Results;
}>();

const $x = useRouteX();

const model = defineModel<boolean>({ required: true });
</script>

<template>
  <q-drawer v-model="model" side="right" bordered :width="300" :breakpoint="600">
    <q-scroll-area style="height: 100%">
      <q-list dense separator class="text-subtitle2">
        <q-item
          v-for="m in results"
          :key="m.ID"
          clickable
          v-ripple
          active
          active-class="primary"
          :to="`/${$x.botType()}/${$x.id()}/${m.ID}`"
        >
          <q-item-section> {{ new Date(m.CreatedAt).toLocaleString() }} </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
