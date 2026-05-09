<script setup lang="ts">
import DateTimeInput from 'components/input/DateTimeInput.vue';
import ViewImgBtn from 'components/btn/ViewImgBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import TextEditor from 'components/editor/TextEditor.vue';
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import { ref } from 'vue';
import InnerLoading from 'components/loading/InnerLoading.vue';
import PromptCard from 'components/card/PromptCard.vue';
import { BlogPost, type Post } from 'src/types/model';
import { Loading } from 'quasar';
import { api } from 'boot/axios';
import useNotifier from 'src/composable/useNotifier';
import { useTokenStore } from 'stores/token-store';

defineProps<{
  color?: string | undefined;
}>();

const $notify = useNotifier();
const $auth = useTokenStore();

const model = defineModel<Post>({ required: false, default: new BlogPost() });

const dialog = ref(false);
const onAccept = (s: string) => {
  model.value.body = s;
  dialog.value = false;
};
const onCancel = () => (dialog.value = false);
const onPublish = () => {
  if ($auth.IsGuest()) {
    $notify.MembersOnly();
    return;
  }
  Loading.show({ spinnerColor: 'primary' });
  return api
    .post<{ link: string }>(`/shopify`, model.value)
    .then((r) => $notify.ArticleCreated(r.data.link))
    .catch($notify.err)
    .finally(Loading.hide);
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
            v-model="model.title"
            :color="color ?? 'green-13'"
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
            @update:model-value="(s) => (model.tags = [s])"
            :model-value="model.tags"
            :color="color ?? 'green-13'"
            :options="[
              'boat fire',
              'e-bike fire',
              'e-scooter fire',
              'ev fire',
              'golf cart fire',
              'lithium-ion battery fire',
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
            v-model="model.publishedAt"
            :color="color ?? 'green-13'"
            hint="Publication date; Can be back dated."
          />
        </div>
      </div>

      <!--excerpt-->
      <div class="col-grow q-mb-md">
        <q-input
          v-model="model.summary"
          :color="color ?? 'green-13'"
          hint="Post summary; Appears on home page & blog page."
          label="Excerpt"
          dense
          filled
          hide-bottom-space
          square
        />
      </div>

      <!--img src-->
      <div class="col-grow q-mb-md">
        <q-input
          v-model="model.image.url"
          :color="color ?? 'green-13'"
          hint="Main image of the post; .webp, .jpg, .jpeg, or .png required."
          label="Image URL"
          filled
          dense
          square
        >
          <template #append>
            <ViewImgBtn
              title="Shopify Blog Post Image Preview"
              :url="model.image.url"
              :color="color ?? 'green-13'"
            >
              <q-tooltip anchor="bottom middle" self="top end" :offset="[10, 10]">
                Image Preview
              </q-tooltip>
            </ViewImgBtn>
          </template>
        </q-input>
      </div>

      <!--img alt-->
      <div class="col-grow q-mb-md">
        <q-input
          v-model="model.image.altText"
          :color="color ?? 'green-13'"
          :disable="model.image.url === ''"
          hint="Brief description of the image."
          label="Image Alt"
          filled
          dense
          square
        />
      </div>

      <!--keywords-->
      <div class="col-grow q-mb-md">
        <q-select
          v-model="model.keywords"
          :color="color ?? 'green-13'"
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
          v-model="model.backlink"
          :color="color ?? 'green-13'"
          label="Backlink"
          hint="URL relating to this post (optimization)."
          dense
          filled
          square
        >
          <template #append>
            <OpenInNewBtn :url="model.backlink ?? ''" :color="color ?? 'green-13'">
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
          v-model="model.body"
          :color="color ?? 'green-13'"
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
        :disable="model.body === ''"
      />
      <SubmitBtn
        @click="onPublish"
        size="md"
        class="q-ml-sm"
        label="Publish"
        :disable="
          model.title === '' ||
          model.image.url === '' ||
          model.image.altText === '' ||
          model.summary === '' ||
          model.tags.length === 0 ||
          model.body === ''
        "
      />
    </q-card-actions>
  </q-card>
  <q-dialog v-model="dialog" position="bottom" full-width persistent>
    <PromptCard
      heading="Content Optimizer"
      subheading="Instruct AI on how to best optimize this blog post."
      v-model:content="model.body"
      v-model:backlink="model.backlink"
      v-model:keywords="model.keywords"
      @cancel="onCancel"
      @accept="onAccept"
      :color="color ?? 'green-13'"
      message-placeholder="Write a blog post summarizing ${content}. Include the following keywords ${keywords} and a link to ${backlink} for the original article."
      system-placeholder="You are a lithium ion fire blanket salesman for a company named FireFibers."
    />
    <InnerLoading :color="color" label="Waiting on AI ..." />
  </q-dialog>
</template>
