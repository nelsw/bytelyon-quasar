<script setup lang="ts">
import LogoImg from 'components/img/LogoImg.vue';
</script>

<template>
  <div class="">
    <div class="column" style="height: calc(100vh - 49px)">
      <div class="col-2"></div>
      <div class="col-4">
        <div class="flex items-center justify-center">
          <LogoImg width="250px" random />
        </div>
      </div>
      <div class="col">
        <div class="flex items-center justify-center q-mt-md">
        <span class="text-h3 text-weight-medium text-center"> Welcome to the jungle. </span>
        </div>
      </div>
    </div>
  </div>
</template>
