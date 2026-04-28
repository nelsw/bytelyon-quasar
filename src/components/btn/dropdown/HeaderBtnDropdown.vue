<script setup lang="ts">
defineProps<{
  icon: string;
  label: string;
  color: string;
  active: boolean | undefined;
}>();
</script>

<template>
  <q-btn-dropdown
    class="my-btn"
    :dropdown-icon="icon"
    :outline="active"
    :text-color="color"
    auto-close
    noIconAnimation
  >
    <template v-if="$q.screen.gt.xs" #label>
      <span class="q-ml-sm text-white"> {{ label }} </span>
    </template>
    <slot />
  </q-btn-dropdown>
</template>
<style lang="scss" scoped>
.q-btn--outline::before {
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 2px;
}
</style>
