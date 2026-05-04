<script setup lang="ts">
import TextEditor from 'components/editor/TextEditor.vue';
import { ref } from 'vue';
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import { api } from 'boot/axios';
import { date, Loading } from 'quasar';
import useNotifier from 'src/composable/useNotifier';
import DateTimeInput from 'components/input/DateTimeInput.vue';
import ViewImgBtn from 'components/btn/ViewImgBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import type { Article } from 'src/types/model';
import { useTokenStore } from 'stores/token-store';

const color = 'green-13';
const systemPlaceholder =
  'You are a lithium ion fire blanket salesman for a company named FireFibers.';
const messagePlaceholder =
  'Write a blog post summarizing {body}. Include the following keywords {keywords} and a link to {url} for the original article.';

const $notify = useNotifier();
const $auth = useTokenStore();

const url = ref<string>('');
const title = ref<string>('');
const body = ref<string>('');
const summary = ref<string>('');
const tags = ref<string[]>([]);
const image = ref<string>('');
const publishedAt = ref<string>(date.formatDate(new Date(), 'YYYY-MM-DD HH:mm'));
const keywords = ref<string[]>([]);

const dialog = ref(false);
const system = ref('');
const message = ref('');
const result = ref('');
const working = ref(false);

const onPublish = async () => {
  if ($auth.IsGuest()) {
    $notify.MembersOnly();
    return;
  }
  Loading.show({ spinnerColor: 'primary' });
  const a: Article = {
    title: title.value,
    body: body.value,
    summary: summary.value,
    tags: tags.value,
    image: image.value,
    publishedAt: publishedAt.value,
  };
  return api
    .put<{ link: string }>(`/articles`, a)
    .then((r) => $notify.ArticleCreated(r.data.link))
    .catch($notify.err)
    .finally(Loading.hide);
};

const onSubmit = async (system: string, message: string, html: boolean) => {
  if ($auth.IsGuest()) {
    $notify.MembersOnly();
    return;
  }
  working.value = true;
  if (system === '') {
    system = systemPlaceholder;
  }
  if (message === '') {
    message = messagePlaceholder;
  }
  message = message.replaceAll(`{body}`, body.value);
  message = message.replaceAll(`{keywords}`, keywords.value.join(','));
  message = message.replaceAll(`{url}`, url.value);
  await api
    .post<{ text: string }>(`/ai`, { system, message, html })
    .then((r) => (result.value = r.data.text))
    .catch(() => $notify.Error('Something went wrong ... contact Carl.'))
    .finally(() => (working.value = false));
};

const onCancel = () => {
  dialog.value = false;
  result.value = '';
};

const onAccept = () => {
  body.value = result.value;
  dialog.value = false;
  result.value = '';
};
</script>

<template>
  <q-card class="bg-transparent" flat>

    <q-card-section>
      <div class="flex items-center q-gutter-sm">
        <span class="text-h5 text-weight-medium text-uppercase">Article Spinner</span>
        <span class="text-subtitle2">
          Publish blog posts to Shopify with content optimized by AI.
        </span>
      </div>
    </q-card-section>

    <q-card-section class="q-py-none">
      <!--title-->
      <div class="flex items-center q-mb-md">
        <div class="col-grow">
          <q-input
            v-model="title"
            :color="color"
            hint="The title of the blog post; Short & sweet is best."
            label="Title"
            autofocus
            filled
            dense
            square
          />
        </div>
      </div>

      <!--tag & timestamp -->
      <div class="flex items-center q-mb-md q-gutter-md">
        <!--tag-->
        <div class="col-grow">
          <q-select
            v-model="tags"
            :color="color"
            :options="[
                'boat fire',
                'e-bike fire',
                'e-scooter fire',
                'ev fire',
                'golf cart fire',
                'rv fire',
              ]"
            class="flex col-md-1 col-sm-12"
            hint="Post category."
            input-debounce="0"
            label="Tag"
            dense
            filled
            hide-dropdown-icon
            square
          />
        </div>
        <!--timestamp-->
        <div class="col-shrink">
          <DateTimeInput
            v-model="publishedAt"
            :color="color"
            hint="Publication date; Can be back dated."
          />
        </div>
      </div>

      <!--excerpt-->
      <div class="col-grow q-mb-md">
        <q-input
          v-model="summary"
          :color="color"
          hint="Post summary; Appears on home page & blog page."
          label="Excerpt"
          dense
          filled
          hide-bottom-space
          square
        />
      </div>

      <!--img-->
      <div class="col-grow q-mb-md">
        <q-input
          v-model="image"
          :color="color"
          hint="Main image of the post; .webp, .jpg, .jpeg, or .png required."
          label="Image"
          filled
          dense
          square
        >
          <template #append>
            <ViewImgBtn title="Shopify Blog Post Image Preview" :url="image" :color="color">
              <q-tooltip anchor="bottom middle" self="top end" :offset="[10, 10]">
                Image Preview
              </q-tooltip>
            </ViewImgBtn>
          </template>
        </q-input>
      </div>

      <!--keywords-->
      <div class="col-grow q-mb-md">
        <q-select
          v-model="keywords"
          :color="color"
          class="flex col-grow"
          hint="Query terms that relate to this post (optimization)."
          input-debounce="0"
          label="Keywords"
          new-value-mode="add-unique"
          dense
          filled
          hide-dropdown-icon
          multiple
          square
          use-chips
          use-input
        />
      </div>

      <!--url-->
      <div class="col-grow q-mb-md">
        <q-input
          v-model="url"
          :color="color"
          label="URL"
          hint="URL relating to this post (optimization)."
          dense
          filled
          square
        >
          <template #append>
            <OpenInNewBtn :url="url" :color="color">
              <q-tooltip anchor="bottom middle" self="top end" :offset="[10, 10]">
                Open in new tab
              </q-tooltip>
            </OpenInNewBtn>
          </template>
        </q-input>
      </div>

      <!--editor-->
      <div class="col-grow">
        <TextEditor
          v-model="body"
          :color="color"
          placeholder="Body"
          label="Main content of blog post (styling supported)."
          kitchen-sink
        />
      </div>
    </q-card-section>
    <q-card-actions class="justify-end q-mr-sm">
      <SubmitBtn
        @click="dialog = true"
        size="md"
        label="Optimize"
        outline
        :disable="body === ''"
      />
      <SubmitBtn
        @click="onPublish"
        size="md"
        class="q-ml-sm"
        label="Publish"
        :disable="
                title === '' || image === '' || summary === '' || tags.length === 0 || body === ''
              "
      />
    </q-card-actions>
  </q-card>
  <q-dialog v-model="dialog" position="bottom" full-width persistent>
    <q-card>
      <q-card-section>
        <div class="flex justify-around items-center q-gutter-sm">
          <div class="text-h4">Article Optimizer</div>
          <div v-if="result === ''" class="text-body2 text-center">
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
              v-if="result === ''"
              @click="onSubmit(system, message, true)"
              label="Submit"
            />
            <SubmitBtn v-else @click="onAccept" label="Accept" />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <div v-if="result === ''">
        <q-card-section>
          <q-card-section>
            <div class="col-grow q-gutter-sm">
              <div>
                <div class="flex items-center q-gutter-sm">
                  <span class="text-subtitle1 text-bold q-mr-sm">System</span>
                  <span class="text-subtitle2">Define a role or persona for the system.</span>
                </div>
                <TextEditor v-model="system" :placeholder="systemPlaceholder" empty />
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
                <TextEditor v-model="message" :placeholder="messagePlaceholder" empty />
              </div>
            </div>
          </q-card-section>
        </q-card-section>
      </div>
      <div v-else>
        <q-card-section class="q-px-lg">
          <div class="flex q-px-md" v-html="result" />
        </q-card-section>
      </div>
    </q-card>

    <q-inner-loading
      :showing="working"
      label="Waiting for a response ..."
      label-class="text-green-13"
      label-style="font-size: 1.1em"
    />
  </q-dialog>
</template>
