<script setup lang="ts"></script>
<template>
  <q-layout view="hHh lpR lFr">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style lang="scss">
.q-separator--dark {
  background-color: rgb(255, 255, 255, 0.12);
}
.q-header.bg-dark,
.q-drawer--left.q-drawer--bordered,
.q-drawer--right.q-drawer--bordered,
body.body--dark.q-drawer {
  border-color: rgb(255, 255, 255, 0.12) !important;
}
.q-icon.q-btn-dropdown__arrow.q-btn-dropdown__arrow-container {
  display: none;
}
.q-footer.bg-dark {
  border-color: #ffffff1e !important;
}
</style>
