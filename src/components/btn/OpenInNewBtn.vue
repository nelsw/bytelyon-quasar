<script setup lang="ts">
const props = defineProps<{
  url: string;
  color?: string | undefined;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}>();
const onClick = () => {
  open(props.url, '_blank');
};
</script>

<template>
  <q-btn @click="onClick" :size="size" color="primary" dense flat no-caps>
    <q-icon :size="size" name="mdi-open-in-new" color="primary" />
  </q-btn>
</template>
