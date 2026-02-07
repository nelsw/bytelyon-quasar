<script setup lang="ts">
import MenuBtn from 'components/btn/MenuBtn.vue';
import LogoImg from 'components/img/LogoImg.vue';

const drawerLeft = defineModel<boolean>('drawerLeft', { required: true });
const drawerRight = defineModel<boolean>('drawerRight', { required: true });
</script>

<template>
  <q-footer class="bg-dark" bordered>
    <q-toolbar class="flex justify-between align-center">
      <MenuBtn v-model="drawerLeft" />
      <div class="flex justify-between align-center">
        <q-avatar size="sm" class="q-mt-xs">
          <LogoImg />
        </q-avatar>
        <div class="text-grey text-subtitle1">ByteLyon</div>
      </div>
      <MenuBtn v-model="drawerRight" reverse />
    </q-toolbar>
  </q-footer>
</template>

<style scoped lang="scss">
.my-footer {
  max-height: 40px;
}
.my-toolbar {
  margin-bottom: 10px;
}
.q-footer.bg-dark {
  border-color: #ffffff1e !important;
}
</style>
