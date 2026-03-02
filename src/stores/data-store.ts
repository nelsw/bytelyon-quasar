import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import type { BotType, Err } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import { useLogger } from 'src/composable/useLogger';

const $log = useLogger();
const $notify = useNotifier();

const setup = () => {

  const Find = async <T>(t: BotType, id:number): Promise<T[]> => {
    return await api
      .get<T[]>(`/${t}/bot/${id}`)
      .then((res: AxiosResponse<T[]>) => res.data)
      .catch((err: AxiosError) => {
        $log.err(err, `Find Bot Results ${t} ${id}`);
        return [];
      });
  };

  const Delete = async (t: BotType, id:string, notify:boolean): Promise<boolean> => {
    return await api
      .delete(`/${t}/id/${id}`)
      .then(() => {
        if (notify) {
          $notify.ok(null, `Delete Successfully`);
        }
        return true;
      })
      .catch((err: AxiosError<Err>) => {
        if (notify) {
          $notify.err(err, `Delete Bot Result ${t} ${id}`);
        }
        return false;
      });
  }

  const DeleteAll = async (t: BotType, ids: string[]): Promise<string[]> => {
    const ok:string[] = [];
    for (const id of ids) {
      if (await Delete(t, id, false)) {
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
