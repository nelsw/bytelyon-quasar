<script setup lang="ts">
import { useProfileStore } from 'stores/profile-store';
import { onMounted } from 'vue';

const store = useProfileStore();
onMounted(store.load);
</script>

<template>
  <q-card class="my-card" flat bordered>
    <q-img src="~assets/guest-background.png" />

    <q-card-section>
      <q-avatar
        size="50px"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      >
        <img src="../../assets/guest-avatar.png" alt="Guest Avatar" />
      </q-avatar>
      <div class="row no-wrap items-center">
        <div class="col text-caption">{{ store.proxy.name }}</div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<style  lang="scss">
.my-card {
  width: 100%;
  max-width: 300px;
  min-width: 200px;
}
</style>
