<script setup lang="ts">
const thumbStyle = { borderRadius: '5px', backgroundColor: '#027be3', width: '5px', opacity: '0.75' };
const barStyle = { borderRadius: '9px', backgroundColor: '#027be3', width: '9px', opacity: '0.2' };
</script>

<template>
  <q-scroll-area
    :visible="false"
    :horizontal-offset="[0, 2]"
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
  >
    <slot/>
  </q-scroll-area>
</template>
