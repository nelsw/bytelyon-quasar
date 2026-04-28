<script setup lang="ts">
import useNotifier from 'src/composable/useNotifier';
import { Sleep } from 'src/types/base';

defineProps<{
  disable?: boolean;
  tooltip?: string | undefined;
  outline?: boolean | undefined;
  soft?: boolean | undefined;
}>();

const emit = defineEmits<{
  delete: [void];
}>();

const $notify = useNotifier();

const onClick = async (soft: boolean) => {
  if (!soft) {
    emit('delete');
    return;
  }

  let t: number = 6250;

  const dismiss = $notify.Actions(
    'Deleting ',
    'mdi-delete',
    'pink-13',
    [{ label: 'UNDO', icon: 'mdi-undo', color: 'white', handler: () => (t = -1) }],
    true,
  );

  while (t > 0) {
    t -= 250;
    await Sleep(250);
  }

  dismiss();

  if (t < 0) return;

  emit('delete');
};
</script>
<template>
  <q-btn
    @click="onClick(soft ?? false)"
    :color="disable ? 'grey-9' : 'pink-13'"
    :icon="`mdi-delete${outline ? '-outline' : ''}`"
    dense
    flat
  >
    <q-tooltip v-if="tooltip !== undefined" :offset="[10, 10]">
      {{ tooltip }}
    </q-tooltip>
    <slot />
  </q-btn>
</template>
