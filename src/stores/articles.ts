import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import type { Article, NewsBotResult } from 'src/types/model';
import { api, type AxiosResponse } from 'boot/axios';
import useNotifier from 'src/composable/useNotifier';
import { date, Loading, openURL } from 'quasar';

const $notify = useNotifier();

export const useArticles = defineStore('articles', () => {
  const show = ref(false);

  const article = ref<Article>({
    title: '',
    body: '',
    summary: '',
    tags: [],
    image: '',
    prompt: 'You are a lithium ion fire blanket salesman for a company named FireFibers',
    publishedAt: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
    url: '',
    keywords: [],
  });

  const load = (result: NewsBotResult | undefined) => {
    article.value.title = result?.title ?? '';
    article.value.body = result?.body?.map((s: string) => `<p>${s}</p>`).join('') ?? '';
    article.value.summary = result?.description ?? '';
    article.value.image = result?.image ?? '';
    article.value.publishedAt = date.isValid(result?.publishedAt ?? '') ? date.formatDate(result?.publishedAt, 'YYYY-MM-DD HH:mm') : '';
    article.value.url = result?.url ?? '';
    article.value.tags = [];
    article.value.keywords = [];
    show.value = true;
  };

  const create = async () => {
    Loading.show({ spinnerColor: 'primary' });
    return api
      .post(`/articles`, article.value)
      .then((res: AxiosResponse<{ link: string; }>) => {
        show.value = false;
        return $notify.act('Article created successfully!', 'https://bytelyon-public.s3.amazonaws.com/shopify.png', [
          {
            label: 'View',
            textColor: 'light-green',
            handler: () => {
              openURL(res.data.link);
            }
          }
        ]);
      })
      .catch($notify.err)
      .finally(Loading.hide);
  };

  return {
    article, show,
    create, load
  };
}, {
  persist: {
    debug: true,
    storage: sessionStorage
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArticles, import.meta.hot));
}
