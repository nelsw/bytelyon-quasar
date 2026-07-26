<script setup lang="ts">
import { useProfileStore } from 'src/stores/profile';

const $profile = useProfileStore();
</script>

<template>
  <q-btn v-if="$profile.model.img" dense round unelevated>
    <q-avatar size="md">
      <img :src="$profile.model.img" />
    </q-avatar>
  </q-btn>
  <q-btn v-else text-color="grey-5" icon="mdi-account" dense round unelevated />
</template>
