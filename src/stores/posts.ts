import { acceptHMRUpdate, defineStore } from 'pinia';
import type { Post } from 'src/types/model';
import { BlogPost } from 'src/types/model';
import { computed, ref } from 'vue';
import { Loading } from 'quasar';
import { api } from 'boot/axios';
import useNotifier from 'src/composable/useNotifier';
import { useTokenStore } from 'stores/token-store';

const $notify = useNotifier();
const $auth = useTokenStore();

export const usePosts = defineStore(
  'posts',
  () => {
    const dialog = ref(false);
    const model = ref<Post>(new BlogPost());

    const publishable = computed(
      () =>
        model.value.title !== '' &&
        model.value.image.url !== '' &&
        model.value.image.altText !== '' &&
        model.value.summary !== '' &&
        model.value.tags.length !== 0 &&
        model.value.body !== '',
    );

    const publish = () => {
      if ($auth.IsGuest()) {
        $notify.MembersOnly();
        return;
      }
      Loading.show({ spinnerColor: 'primary' });
      return api
        .put<{ link: string }>(`/articles`, model.value)
        .then((r) => $notify.ArticleCreated(r.data.link))
        .catch($notify.err)
        .finally(Loading.hide);
    }

    return {
      model,
      dialog,
      publishable,
      publish,
    };
  },
  {
    persist: {
      debug: true,
      storage: sessionStorage,
    },
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePosts, import.meta.hot));
}
