import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { api, type AxiosResponse } from 'boot/axios';
import type { NewsBotResult } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

const setup = () => {

  const removing = ref(false);
  const loading = ref(false);
  const botId = ref<string>('');
  const model = ref<NewsBotResult[][]>([]);
  const selected = ref<NewsBotResult[]>([]);

  const busy = computed(() => removing.value || loading.value);

  const findIndex = (botId: string): number => model.value.findIndex(a => a?.[0]?.botId === botId);

  const find = (botId: string): NewsBotResult[] => loading.value ? [] : model.value[findIndex(botId)] ?? []

  const target  = (botId: string): string => find(botId)?.[0]?.target ?? '';

  const load = async (id: string, force?:boolean) => {
    botId.value = id;
    if (find(id).length > 0 && !force) return;
    loading.value = true;
    selected.value = [];
    return await api
      .get<NewsBotResult[]>(`/bots?type=news&id=${id}`)
      .then((r: AxiosResponse<NewsBotResult[]>) => {
        const idx = findIndex(id);
        if (idx > 0) {
          model.value.fill(r.data ?? [], idx, idx + 1);
        } else {
          model.value.push(r.data ?? []);
        }
      })
      .catch($notify.err)
      .finally(() => loading.value = false);
  };

  const remove = async () => {

    removing.value = true;

    const doRemove = (id:string) => api
      .delete(`/bots?type=news&botId=${botId.value}&id=${id}`)
      .then(() => id)
      .catch(() => null);

    const promises: Promise<string | null>[] = selected.value
      .map(r => r.id)
      .map((id: string) => doRemove(id));

    const ok: string[] = await Promise
      .all(promises)
      .then(values => values.filter(s => s !== null));

    const idx = findIndex(botId.value);
    if (model.value[idx]) {
      model.value[idx] = model.value[idx].filter((v: NewsBotResult) => !ok.includes(v.id));
    }

    if (ok.length === selected.value.length) {
      $notify.ok(null, `🤖`, `News Bot Results Deleted`);
      selected.value = [];
    } else {
      $notify.warn(`Failed to delete all News Bot Results; Refresh now.`);
      selected.value = selected.value.filter(r => !ok.includes(r.id));
    }

    removing.value = false;
  };

  return {
    busy, model, selected,
    target, load, remove, find
  };
};

export const useNewsBotResultsStore = defineStore('news-bot-results-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNewsBotResultsStore, import.meta.hot));
}
