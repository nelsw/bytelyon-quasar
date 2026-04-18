<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  s3Key?: string;
  src?: string;
  open?: boolean;
  errText?: boolean;
}>();
const onClick = () => {
  if (props.open) open(src.value, '_blank');
};
const src = computed(() => props.src ?? `https://bytelyon-public.s3.amazonaws.com/${props.s3Key}`);
</script>

<template>
  <q-img
    @click="onClick"
    :src="src"
    error-src="~assets/ByteLyon-Logo-OG.svg"
    :class="`${open ? 'cursor-pointer' : ''}`"
  >
    <template v-slot:error>
      <div class="absolute-full flex flex-center">
        <span v-if="errText"> Unable to load image {{ src }}</span>
      </div>
    </template>
  </q-img>
</template>
