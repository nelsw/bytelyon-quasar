<script setup lang="ts">
import { api } from 'boot/axios';
import { computed, ref } from 'vue';
import useNotifier from 'src/composable/useNotifier';
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import TextEditor from 'components/editor/TextEditor.vue';
import InnerLoading from 'components/loading/InnerLoading.vue';
import { useUserStore } from 'src/stores/user';

const emit = defineEmits<{
  cancel: [void];
  accept: [string];
}>();

const props = defineProps<{
  color?: string | undefined;
  transparent?: boolean | undefined;
  systemPlaceholder?: string | undefined;
  messagePlaceholder?: string | undefined;
  heading?: string | undefined;
  subheading?: string | undefined;
}>();

const $notify = useNotifier();
const $auth = useUserStore();

const content = defineModel<string>('content', { required: false, default: '' });
const backlink = defineModel<string | undefined>('backlink', { required: false, default: '' });
const keywords = defineModel<string[] | undefined>('keywords', { required: false, default: [] });

const busy = ref(false);
const res = ref('');
const sys = ref('');
const msg = ref('');

const onAccept = () => {
  emit('accept', res.value);
  onCancel();
};

const onCancel = () => {
  res.value = '';
  sys.value = '';
  msg.value = '';
  emit('cancel');
};

const messageValue = computed(() => {
  let m = msg.value;
  if (m === '') {
    m = props.messagePlaceholder ?? '';
  }
  if (content.value !== '') {
    m = m.replaceAll('${content}', content.value);
  }
  if (backlink.value) {
    m = m.replaceAll('${backlink}', backlink.value);
  }
  if (keywords.value) {
    m = m.replaceAll('${keywords}', keywords.value.join(','));
  }
  return m;
});

const onSubmit = async () => {
  if ($auth.auth.IsGuest) {
    $notify.MembersOnly();
    return;
  }
  busy.value = true;
  await api
    .post<{ text: string }>(`/ai`, {
      system: sys.value !== '' ? sys.value : (props.systemPlaceholder ?? ''),
      message: messageValue.value,
      html: true,
    })
    .then((r) => (res.value = r.data.text))
    .catch(() => $notify.Error('Something went wrong ... contact Carl.'))
    .finally(() => (busy.value = false));
};
</script>

<template>
  <q-card :class="`${transparent ? 'bg-transparent' : ''}`" flat>
    <q-card-section>
      <div class="flex justify-between items-center">
        <div class="flex items-center q-gutter-sm">
          <span class="text-h5 text-weight-medium text-uppercase">
            {{ heading ?? 'AI Prompt' }}
          </span>
          <span class="text-subtitle2">
            {{ subheading ?? 'Define the following contexts to generate a response from AI' }}
          </span>
        </div>
        <div class="flex justify-around items-center q-gutter-sm">
          <q-btn
            @click="onCancel"
            class="q-mr-sm"
            color="grey-8"
            label="Cancel"
            size="lg"
            outline
            square
          />
          <SubmitBtn
            v-if="res === ''"
            @click="onSubmit"
            :disable="messageValue === ''"
            label="Send"
          />
          <SubmitBtn v-else @click="onAccept" :disable="messageValue === ''" label="Accept" />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-py-none">
      <div class="q-gutter-sm">
        <div class="flex items-center">
          <span class="text-subtitle1 text-bold q-mr-sm">System</span>
          <span class="text-subtitle2">Define a role or persona for the system.</span>
        </div>
        <TextEditor v-model="sys" :placeholder="systemPlaceholder" empty />
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-gutter-sm">
        <div class="flex items-center">
          <span class="text-subtitle1 text-bold q-mr-sm">Message</span>
          <span class="text-subtitle2">Describe what you want the system to create.</span>
        </div>
        <TextEditor v-model="msg" :placeholder="messagePlaceholder" empty />
      </div>
    </q-card-section>
      <q-separator spaced inset />
    <q-card-section v-if="res !== ''">
      <div class="q-gutter-sm">
        <div class="text-subtitle1 text-bold q-mr-sm">Result</div>
        <div v-html="res" />
      </div>
    </q-card-section>
  </q-card>
  <InnerLoading v-model="busy" :color="color" label="Waiting on AI to respond ..." />
</template>
