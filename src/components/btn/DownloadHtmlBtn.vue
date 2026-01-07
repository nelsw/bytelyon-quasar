<script setup lang="ts">
import { computed, ref } from 'vue';
// import XTooltip from 'components/tooltip/XTooltip.vue';

const props = defineProps<{
  url: string;
  color?: string | undefined;
  dark?: boolean | undefined;
}>();

const model = ref<boolean>(false);
const color = computed(() => props.color || 'orange-5');
// const clazz = computed(() => `bg-${color.value} ${props.dark ? 'text-dark' : ''}`);
const handleClick = () => {
  model.value = true;
  setTimeout(() => (model.value = false), 1000);
};
</script>

<template>
  <q-btn dense flat no-caps size="sm" @click="handleClick">
    <q-icon name="mdi-language-html5" :color="color" size="xs" />
<!--    <x-tooltip text="Download<br>HTML" :class="clazz" />-->
  </q-btn>
  <iframe v-if="model" :src="url" style="display: none" />
</template>
