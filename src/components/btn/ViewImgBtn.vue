<script setup lang="ts">
import MaxDialog from 'components/dialog/MaxDialog.vue';
// import XTooltip from 'components/tooltip/XTooltip.vue';
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  url: string;
  color?: string | undefined;
  dark?: boolean | undefined;
}>();

const model = defineModel<boolean>({ default: false });
const color = computed(() => props.color || 'orange-5');
// const clazz = computed(() => `bg-${color.value} ${props.dark ? 'text-dark' : ''}`);
</script>

<template>
  <q-icon name="mdi-image-outline" :color="color" size="xs" class="clicka"/>
<!--  <q-btn @click="model = true" size="xs" dense flat>-->
<!--    <x-tooltip text="View<br>Screenshot" :class="clazz" />-->
<!--  </q-btn>-->
  <MaxDialog v-model="model">
    <template #title>
      <span class="text-h5">
        {{ title }}
      </span>
    </template>
    <template #content>
      <q-img :src="url" />
    </template>
  </MaxDialog>
</template>
