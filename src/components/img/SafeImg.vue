<script setup lang="ts">
const props = defineProps<{
  s3Key?: string;
  src?: string;
  open?: boolean;
  errText?: boolean;
}>();
const onClick = () => {
  if (props.open) open(props.src, '_blank');
};
</script>

<template>
  <q-img
    @click="onClick"
    :src="src"
    error-src="~assets/ByteLyon-Logo-OG.svg"
    :class="`${open ? 'cursor-pointer' : ''}`"
    fit="contain"

  >
    <template v-slot:error>
      <div class="absolute-full flex flex-center">
        <span v-if="errText"> Unable to load image {{ src }}</span>
      </div>
    </template>
  </q-img>
</template>
