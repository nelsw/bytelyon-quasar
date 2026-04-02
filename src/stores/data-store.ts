import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import type { Err } from 'src/types/model';
import { BotType } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import { useLogger } from 'src/composable/useLogger';
import { base64 } from 'src/types/base';

const $log = useLogger();
const $notify = useNotifier();

const setup = () => {
  const Find = async <T>(t: BotType, id: number): Promise<T[]> => {
    return await api
      .get<T[]>(`/bots?type=${t}&id=${id}`)
      .then((res: AxiosResponse<T[]>) => res.data)
      .catch((err: AxiosError) => {
        $log.err(err, `Find Bot Results ${t} ${id}`);
        return [];
      });
  };

  const Delete = async (
    t: BotType,
    target: string,
    botId: string,
    id: string,
    notify: boolean,
  ): Promise<boolean> => {
    if (t === BotType.Sitemap) {
      target = base64(target);
    }
    return await api
      .delete(`/bots?type=${t}&target=${target}&id=${id}&botId=${botId}`)
      .then(() => {
        if (notify) {
          $notify.ok(null, `Deleted`);
        }
        return true;
      })
      .catch((err: AxiosError<Err>) => {
        if (notify) {
          $notify.err(err, `Delete Failed`);
        }
        return false;
      });
  };

  const DeleteAll = async (t: BotType, target: string, botId:string, ids: string[]): Promise<string[]> => {
    const ok: string[] = [];
    for (const id of ids) {
      if (await Delete(t, target, botId, id, false)) {
        ok.push(id);
      }
    }
    if (ok.length === ids.length) {
      $notify.ok(null, `Delete Successful`);
    }
    return ok;
  };

  return {
    Find,
    Delete,
    DeleteAll,
  };
};

export const useDataStore = defineStore('data-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot));
}
