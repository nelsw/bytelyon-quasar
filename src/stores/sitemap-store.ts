import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { type Sitemaps } from 'src/types/sitemaps';
import { Notify } from 'quasar';

const id = 'sitemap-store';
const options = {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
};
const setup = () => {
  const loading = ref<boolean>(true);
  const model = ref<Sitemaps[]>([]);

  const load = async () => {
    loading.value = true;
    return await api
      .get('/sitemaps')
      .then((res: AxiosResponse<Sitemaps[]>) => (model.value = res.data))
      .catch((err: AxiosError) => console.error(err))
      .finally(() => (loading.value = false));
  };

  const create = async (url: string) => {
    loading.value = true;
    return await api
      .post('/sitemaps', { url: url })
      .then(() => {
        loading.value = false;
        Notify.create({
          timeout: 2000,
          position: 'bottom',
          message:
            '<div class="text-center">Roar!<br>Sitemap is building,<br>and will appear shortly.</div>',
          avatar: 'https://bytelyon-public.s3.amazonaws.com/logo-alt.png',
          multiLine: true,
          html: true,
        });
      })
      .catch((err: AxiosError) => {
        loading.value = false;
        console.error(err);
        Notify.create({
          timeout: 2000,
          position: 'bottom',
          message: `<div class="text-center">There was an issue building your Sitemap;<br>We've been notified and fixing it now.</div>`,
          avatar: 'https://bytelyon-public.s3.amazonaws.com/logo-alt.png',
          multiLine: true,
          html: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          load()
            .then(() =>
              Notify.create({
                timeout: 2000,
                position: 'bottom',
                message: `<div class="text-center">Meow ...<br>Your Sitemap is ready.</div>`,
                avatar: 'https://bytelyon-public.s3.amazonaws.com/logo-alt.png',
                multiLine: true,
                html: true,
              }),
            )
            .catch((err: AxiosError) => console.error(err));
        }, 90_000);
      });
  };

  const remove = async (domain: string, id: string) => {
    loading.value = true;
    return await api
      .delete('/sitemaps', { params: { id: id, domain: domain } })
      .then(load)
      .catch((err: AxiosError) => console.error(err))
      .finally(() => (loading.value = false));
  };

  return { loading, model, load, create, remove };
};

export const useSitemapStore = defineStore(id, setup, options);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSitemapStore, import.meta.hot));
}
