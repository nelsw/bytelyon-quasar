<script setup lang="ts">
import { QInput } from 'quasar';
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import { useFilterStore } from 'stores/filter-store';

const store = useFilterStore();

const isCmd = ref(false);
const isFwdSlash = ref(false);
const input = useTemplateRef<QInput>('my-input');

const inputEmpty = computed(() => {
  return store.model.length === 0;
});

onMounted(() =>
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Meta':
        isCmd.value = true;
        return;
      case '/':
        isFwdSlash.value = true;
        if (isCmd.value) {
          input.value?.focus();
        }
        return;
      case 'Escape':
        store.model = '';
        input.value?.blur();
    }
    isCmd.value = false;
    isFwdSlash.value = false;
  }),
);
</script>

<template>
  <q-input
    ref="my-input"
    class="my-input text-caption"
    v-model="store.model"
    dense
    borderless
    dark
    square
    hide-bottom-space
    placeholder="Search ByteLyon..."
  >
    <template #before>
      <q-icon v-if="store.model.length === 0" name="mdi-magnify" color="grey" size="xs" />
      <q-btn v-else dense size="xs" @click="store.model = ''" flat>
        <q-icon name="mdi-close" color="grey" size="xs" />
      </q-btn>
    </template>
    <template #after>
      <div
        class="text-grey text-caption my-symbol text-center"
        :style="`width:${inputEmpty ? '32' : '32'}px;`"
      >
        {{ inputEmpty ? `⌘/` : `esc` }}
      </div>
    </template>
  </q-input>
</template>

<style scoped lang="scss">
.my-input {
  width: 260px;
}
.my-symbol {
  border: 1px solid #333 !important;
  border-radius: 4px;
  padding: 1px 4px;
}
</style>
