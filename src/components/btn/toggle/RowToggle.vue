<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  expand: boolean;
  value: string | number;
  size?: string;
}>();

const ripple = { center: true };
const disabled = computed(() => props.value === '' || props.value === '0');
const iconName = computed(() => `mdi-chevron-${props.expand ? 'down' : 'up'}`);
const btnSize = computed(() => (props.size ? props.size : 'xs'));
const color = computed(() => (disabled.value ? 'grey' : 'purple'));
</script>

<template>
  <q-btn
    :color="color"
    :disabled="disabled"
    :flat="!expand"
    :outline="expand"
    :ripple="ripple"
    :size="btnSize"
    dense
  >
    <q-icon v-if="!disabled" :name="iconName" :color="color" size="xs" />
    <span class="my-span" v-html="value" />
  </q-btn>
</template>

<style scoped lang="scss">
.my-span {
  font-size: 13px;
  padding-right: 5px;
  color: white;
}
</style>
