<script setup lang="ts">
const props = defineProps<{
  url?: string | undefined;
  color?: string | undefined;
}>();
const onClick = () => open(props.url, '_blank');
</script>

<template>
  <q-btn
    @click="onClick"
    :color="url === '' ? 'grey-8' : color ?? 'teal'"
    dense
    flat
    icon="mdi-open-in-new"
    :disable="!url"
  >
    <slot/>
    </q-btn>
</template>
