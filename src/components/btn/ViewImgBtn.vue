<script setup lang="ts">
import MaxDialog from 'components/dialog/MaxDialog.vue';
import XTooltip from 'components/tooltip/XTooltip.vue';

defineProps<{
  title: string;
  url: string;
}>()

const model = defineModel<boolean>({ default: false });
</script>

<template>
  <q-btn dense flat target="_blank" no-caps size="sm" @click="model=true">
    <q-icon name="mdi-image-outline" color="cyan-14" size="xs" />
    <x-tooltip text="View<br>Image" />
  </q-btn>
  <MaxDialog v-model="model">
    <template v-slot:title>
      <div class="text-h5">
        {{title}}
      </div>
    </template>
    <template v-slot:content>
      <q-img :src="url" />
    </template>
  </MaxDialog>
</template>
