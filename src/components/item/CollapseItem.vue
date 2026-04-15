<script setup lang="ts">
import MenuIcon from 'components/icon/MenuIcon.vue';
const model = defineModel<boolean>({required: true});
</script>

<template>
  <q-item @click="model = !model" class="text-grey-8" clickable>
    <q-item-section avatar>
      <MenuIcon v-model="model" size="sm" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        Collapse
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
