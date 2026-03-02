<script setup lang="ts">
import NewPassDialog from 'components/dialog/NewPassDialog.vue';
import { onMounted, ref } from 'vue';
import LogoImg from 'components/img/LogoImg.vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  id: string;
  type: string;
}>();
const router = useRouter();

const dialog = ref<boolean>(false);
onMounted(async () => {
  console.log(props.id, props.type);
  if (props.type === 'reset') {
    dialog.value = true;
    return;
  }

  try {
    // Simulate an API call to save data
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('Data saved successfully!');

    // Wait for the navigation to finish
    await router.push('/dashboard');
    console.log('Redirect complete.');
  } catch (error) {
    console.error('Error during save or redirect:', error);
  } // 3000 milliseconds = 3 seconds // 2000 milliseconds delay
});
</script>

<template>
  <NewPassDialog v-model="dialog" />
  <div class="fullscreen bg-dark text-white text-center q-pa-sm flex flex-center">
    <LogoImg random width="350" />
    <div>
      <transition
        appear
        enter-active-class="animated fadeIn slow"
        leave-active-class="animated fadeOut slow"
      >
        <h3>Email verified!</h3>
      </transition>
      <transition
        appear
        enter-active-class="animated fadeIn slower"
        leave-active-class="animated fadeOut slower "
      >
        <h4>... let's see the dashboard</h4>
      </transition>
    </div>
  </div>
</template>
