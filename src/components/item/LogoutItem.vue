<script setup lang="ts">
import LogoutIcon from 'components/icon/LogoutIcon.vue';
import { useTokenStore } from 'stores/token-store';
const $auth = useTokenStore();
</script>

<template>
  <q-item @click="$auth.Logout" class="text-grey-8" clickable>
    <q-item-section avatar>
      <LogoutIcon size="sm"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        Logout
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
