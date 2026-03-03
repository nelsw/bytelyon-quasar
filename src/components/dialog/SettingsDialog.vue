<script setup lang="ts">
import ToolbarDialog from 'components/dialog/ToolbarDialog.vue';
import { watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
  foot: boolean;
}>()

const model = defineModel<boolean>({ required: false, default: false });
const route = useRoute();
const router = useRouter();

const onClose = async () => {
  const newQuery = { ...route.query };
  delete newQuery.modal;
  await router.push({ query: newQuery }); // Remove query parameter to close
};

// Watch for changes in the route query
watch(
  () => route.query.modal,
  (newModalValue) => {
    model.value = newModalValue === 'open';
  },
);

// Check on initial page load
onMounted(() => {
  if (route.query.modal === 'open') {
    model.value = true;
  }
  alert(props.foot);
  model.value = props.foot
});
</script>

<template>
  <ToolbarDialog v-model="model" @close="onClose" title="⚙️ Settings">
    <template #content> </template>
  </ToolbarDialog>
</template>

<style scoped lang="scss"></style>
