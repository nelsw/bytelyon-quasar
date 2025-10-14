<script setup lang="ts">
import { ref } from 'vue';

const year = ref<number>(new Date().getFullYear())
</script>

<template>
  <q-footer class="bg-dark" bordered>
    <q-toolbar class="brand-font-500 text-caption text-grey">
      <div class="row col-grow">
        <div class="col">
          &copy; {{ year }} ByteLyon
        </div>
        <div class="col text-right">
          Contact
        </div>
      </div>
    </q-toolbar>
  </q-footer>
</template>
