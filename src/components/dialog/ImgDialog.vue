<script setup lang="ts">
import MaxDialog from 'components/dialog/MaxDialog.vue';
const model = defineModel<boolean>({ required: true });
defineProps<{
  title: string;
  src: string;
}>();
</script>

<template>
  <MaxDialog v-model="model">
    <template v-slot:title>
      <div class="text-h5">
        {{ title }}
      </div>
    </template>
    <template v-slot:content>
      <q-img :src="src" />
    </template>
  </MaxDialog>
</template>
