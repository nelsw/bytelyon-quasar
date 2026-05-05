<script setup lang="ts">
import { api } from 'boot/axios';
import { computed, ref } from 'vue';
import useNotifier from 'src/composable/useNotifier';
import { useTokenStore } from 'stores/token-store';
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import TextEditor from 'components/editor/TextEditor.vue';
import InnerLoading from 'components/loading/InnerLoading.vue';

const emit = defineEmits<{
  cancel: [void];
  accept: [string];
}>();

const props = defineProps<{
  color?: string | undefined;
  systemPlaceholder?: string | undefined;
  messagePlaceholder?: string | undefined;
}>();

const $notify = useNotifier();
const $auth = useTokenStore();

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
  if ($auth.IsGuest()) {
    $notify.MembersOnly();
    return;
  }

  busy.value = true;
  await api
    .post<{ text: string }>(`/ai`, {
      system: sys.value,
      message: messageValue.value,
      html: true,
    })
    .then((r) => (res.value = r.data.text))
    .catch(() => $notify.Error('Something went wrong ... contact Carl.'))
    .finally(() => (busy.value = false));
};
</script>

<template>
  <q-card>
    <q-card-section>
      <div class="flex justify-around items-center q-gutter-sm">
        <div class="text-h4">Article Optimizer</div>
        <div v-if="res === ''" class="text-body2 text-center">
          Use the following context inputs to instruct AI on how to best optimize your text.
        </div>
        <div>
          <q-btn
            @click="onCancel"
            class="q-mr-sm"
            color="grey-8"
            label="Cancel"
            outline
            size="lg"
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
    <q-separator />
    <div v-if="res === ''">
      <q-card-section>
        <q-card-section>
          <div class="col-grow q-gutter-sm">
            <div>
              <div class="flex items-center q-gutter-sm">
                <span class="text-subtitle1 text-bold q-mr-sm">System</span>
                <span class="text-subtitle2">Define a role or persona for the system.</span>
              </div>
              <TextEditor v-model="sys" :placeholder="systemPlaceholder" empty />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="col-grow q-gutter-sm">
            <div>
              <div class="flex items-center q-gutter-sm">
                <span class="text-subtitle1 text-bold q-mr-sm">Message</span>
                <span class="text-subtitle2">Describe what you want the system to create.</span>
              </div>
              <TextEditor v-model="msg" :placeholder="messagePlaceholder" empty />
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </div>
    <div v-else>
      <q-card-section class="q-px-lg">
        <div class="flex q-px-md" v-html="res" />
      </q-card-section>
    </div>
  </q-card>
  <InnerLoading :color="color" label="Waiting on AI response ..." />
</template>
