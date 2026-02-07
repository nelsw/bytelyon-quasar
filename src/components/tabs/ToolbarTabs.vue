<script setup lang="ts">
import { Bots, capitalize } from 'src/types/base';

const emit = defineEmits<{
  update: [string];
}>();
</script>

<template>
  <q-tabs class="text-grey-5" shrink stretch inline-label>
    <q-route-tab
      v-for="b in Bots"
      :key="b.type"
      :icon="b.icon"
      :label="capitalize(b.type)"
      :to="`/${b.type}`"
      @click="emit('update', b.type)"
      :active-class="`text-${b.color}`"
    />
  </q-tabs>
</template>
