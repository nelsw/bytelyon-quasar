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

const color = 'green-13';
const systemPlaceholder =
  'You are a lithium ion fire blanket salesman for a company named FireFibers.';
const messagePlaceholder =
  'Write a blog post summarizing {body}. Include the following keywords {keywords} and a link to {url} for the original article.';

const $notify = useNotifier();

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
  <div class="q-pa-sm q-gutter-y-sm">
    <q-card style="background-color: transparent" flat>
      <q-card-section>
        <div class="flex justify-between items-center q-gutter-sm">
          <div class="flex items-center">
            <span class="text-h5 text-weight-medium text-uppercase q-mr-sm">Article Spinner</span>
            <div class="text-subtitle2">
              Publish blog posts to Shopify with content optimized by AI.
            </div>
          </div>
          <div class="flex justify-end items-center">
            <SubmitBtn
              @click="dialog = true"
              size="md"
              class="q-ml-sm"
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
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered>
      <q-card-section>
        <div class="flex items-center q-mb-md q-gutter-md">
          <!--title-->
          <div class="col-grow">
            <q-input
              label="Title"
              v-model="title"
              :color="color"
              hint="The title of the blog post; Short & sweet is best."
              autofocus
              dense
              filled
            />
          </div>
        </div>

        <div class="flex items-center q-mb-md q-gutter-md">
          <div class="col-grow">
            <!--tag-->
            <q-select
              v-model="tags"
              :options="[
                'boat fire',
                'e-bike fire',
                'e-scooter fire',
                'ev fire',
                'golf cart fire',
                'rv fire',
              ]"
              class="flex col-md-1 col-sm-12"
              label="Tag"
              input-debounce="0"
              hide-dropdown-icon
              :color="color"
              dense
              filled
              hint="Post category."
            />
          </div>
          <!--timestamp-->
          <div class="col-shrink">
            <DateTimeInput
              v-model="publishedAt"
              :color="color"
              hint="Define a publication date; Can be back dated."
            />
          </div>
        </div>

        <!--excerpt-->
        <div class="col-grow q-mb-md">
          <q-input
            label="Excerpt"
            hint="Post summary; Appears on home page & blog page."
            v-model="summary"
            :color="color"
            dense
            filled
            hide-bottom-space
          />
        </div>

        <!--img-->
        <div class="col-grow q-mb-md">
          <q-input
            label="Image"
            v-model="image"
            :color="color"
            hint="URL for main image of the post; Must be .webp, .jpg, .jpeg, or .png."
            filled
            dense
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
            class="flex col-grow"
            input-debounce="0"
            label="Keywords"
            new-value-mode="add-unique"
            hide-dropdown-icon
            multiple
            use-chips
            use-input
            filled
            dense
            :color="color"
            hint="Keywords are query terms that relate to our store (requires optimization)."
          />
        </div>

        <!--url-->
        <div class="col-grow q-mb-md">
          <q-input
            label="URL"
            v-model="url"
            :color="color"
            hint="URL relating to this post; Use for backlinks (required optimization)."
            filled
            dense
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
      </q-card-section>
    </q-card>

    <!--editor-->
    <TextEditor
      v-model="body"
      :color="color"
      :placeholder="`Text editor for blog post body (styling supported).`"
      kitchen-sink
    />
  </div>
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
