import { defineStore } from 'pinia';
import type { Headline } from 'src/types/headline';
import useNewsApi from 'src/composable/api/useNewsApi';
import { computed, ref } from 'vue';
import { date } from 'quasar';
import { decodeTime } from 'ulid';
import { type Article } from 'src/types/article';

type Articles = Record<Url, Article>;
type Headlines = Array<Headline>;
type Model = Record<Topic, News>;
type News = {
  headlines: Headlines;
  articles: Articles;
};
type Topic = string;
type Url = string;

const $api = useNewsApi();

export const useNewsStore = defineStore(
  'news',
  () => {
    /* state */
    const model = ref<Model>({} as Model);
    const url = ref<Url>('');
    const topic = ref<Topic>('');

    /* getters */
    const article = computed(
      () => news(topic.value, url.value).articles?.[url.value] ?? ({} as Article),
    );
    const headlines = computed(() => news(topic.value).headlines ?? ([] as Headlines));
    const post = computed(() => {
      const a = article.value;
      return {
        body: a.body?.map((b) => `<p>${b}</p>`)?.join('') || '',
        image: a.image,
        keywords: a.keywords,
        publishedAt: date.formatDate(decodeTime(a.id), 'YYYY-MM-DD HH:mm'),
        summary: a.description,
        tags: [],
        title: a.title,
        backlink: a.url,
      };
    });

    /* actions */
    const deleteHeadline = async (t: Topic, u: Url) => {
      try {
        const idx = news(t, u).headlines.findIndex((h) => h.url === u) ?? -1;
        if (idx === -1) return;
        await $api.deleteHeadline(t, u);
        news(t).headlines.splice(idx, 1);
      } catch (e) {
        return e;
      }
    };
    const fetchArticle = async (t: Topic, u: Url) => {
      try {
        news(t, u).articles[u] = await $api.getArticle(t, u);
      } catch (e) {
        return e;
      }
    };
    const fetchHeadlines = async (t: Topic) => {
      try {
        news(t).headlines = await $api.getHeadlines(t);
      } catch (e) {
        return e;
      }
    };

    /* helpers */
    const news = (t: Topic, u?: Url): News => {
      topic.value = t;
      url.value = u ?? '';
      if (!model.value[t]) {
        model.value[t] = {
          headlines: [],
          articles: {} as Articles,
        };
      }
      return model.value[t];
    };

    return {
      model,
      topic,
      url,
      article,
      headlines,
      post,
      deleteHeadline,
      fetchArticle,
      fetchHeadlines,
    };
  },
  {
    persist: {
      debug: true,
      storage: sessionStorage,
    },
  },
);
