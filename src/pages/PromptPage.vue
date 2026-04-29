<script setup lang="ts">
import TextEditor from 'components/editor/TextEditor.vue';
import { ref } from 'vue';
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import { api } from 'boot/axios';
import { copyToClipboard, Loading } from 'quasar';
import useNotifier from 'src/composable/useNotifier';
import { useTokenStore } from 'stores/token-store';

const $notify = useNotifier();
const $auth = useTokenStore();

const system = ref('');
const message = ref('');
const result = ref('');

const onSubmit = async (system: string, message: string, html: boolean) => {
  if ($auth.IsGuest()) {
    $notify.MembersOnly()
    return;
  }
  Loading.show({ spinnerColor: 'primary' });
  await api
    .post<{ text: string }>(`/ai`, { system, message, html })
    .then((r) => (result.value = r.data.text))
    .catch((e) => console.error(e))
    .finally(() => Loading.hide());
};

const onCopy = async (text: string) => {
  await copyToClipboard(text)
    .then(() => $notify.ok(null, 'Copied content to clipboard'))
    .catch((err) => $notify.err(err, 'Failed to copy content to clipboard'));
};
</script>

<template>
  <div class="q-pa-sm q-gutter-y-sm">
    <q-card style="background-color: transparent" flat>
      <q-card-section>
        <div class="flex justify-between items-center q-gutter-sm">
          <div>
            <span class="text-h5 text-weight-medium text-uppercase">AI Prompt</span>
            <span class="text-subtitle2 q-ml-sm">
              Send requests and receive responses from agentic AI; Separate sentences into new
              lines.
            </span>
          </div>
          <div>
            <SubmitBtn @click="onSubmit(system, message, true)" color="green-13" size="md" />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card flat>
      <q-card-section>
        <div class="flex justify-evenly items-center q-gutter-sm">
          <div class="flex q-gutter-sm">
            <div>
              <div class="flex items-center q-gutter-sm">
                <span class="text-subtitle1 text-bold q-mr-sm">System</span>
                <span class="text-subtitle2">Define a role or persona for the system.</span>
                <q-space />
                <q-btn @click="system = ''" label="Clear" size="sm" flat dense />
              </div>
              <TextEditor v-model="system" order effect full />
            </div>
          </div>
          <div class="flex q-gutter-sm">
            <div>
              <div class="flex items-center q-gutter-sm">
                <span class="text-subtitle1 text-bold q-mr-sm">Message</span>
                <span class="text-subtitle2">Describe what you want the system to create.</span>
                <q-space />
                <q-btn @click="message = ''" label="Clear" size="sm" flat dense />
              </div>
              <TextEditor v-model="message" order effect full />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div v-if="result !== ''">
      <q-card style="background-color: transparent" flat>
        <q-card-section>
          <div class="flex justify-between q-gutter-sm">
            <div class="text-h6 text-weight-medium text-uppercase">Result</div>
            <q-space />
            <q-btn
              icon="mdi-content-copy"
              label="Copy"
              @click="onCopy(result)"
              dense
              flat
              size="md"
              color="green-13"
            />
          </div>
        </q-card-section>
      </q-card>
      <q-card flat rounded class="q-mx-md">
        <q-card-section class="q-px-lg">
          <div class="flex q-px-md" v-html="result" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
