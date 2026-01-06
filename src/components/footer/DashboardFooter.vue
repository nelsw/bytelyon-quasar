<script setup lang="ts">
import MenuBtn from 'components/btn/MenuBtn.vue';
import LogoutBtn from 'components/btn/LogoutBtn.vue';

const drawerLeft = defineModel<boolean>('drawerLeft', {required: true});
</script>

<template>
  <q-footer
    class="bg-dark"
    bordered
  >
    <q-toolbar class="flex justify-between">
      <MenuBtn v-model="drawerLeft" />
      <div class="text-grey text-subtitle1">ByteLyon</div>
      <LogoutBtn />
    </q-toolbar>
  </q-footer>
</template>

<style scoped lang="scss">
.my-footer {
  max-height: 40px;
}
.my-toolbar {
  margin-bottom: 10px
}
.q-footer.bg-dark {
  border-color: #FFFFFF1E !important;
}
</style>
