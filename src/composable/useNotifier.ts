import type { QNotifyAction, QNotifyOptions } from 'quasar';
import { Notify } from 'quasar';
import type { AxiosError } from 'boot/axios';
import type { Err } from 'src/types/model';


const symbolSpan = (s: string): string => `<span style="margin-right: 8px;">${s}</span>`;
const notify = (msg: string, avatar: string, actions: QNotifyAction[]) => {
  const opts: QNotifyOptions = {
    color: 'dark',
    html: true,
    message: `<div class="text-right">${msg}</div>`,
    position: 'bottom-right',
    textColor: 'white',
    timeout: 5000
  };

  if (actions.length !== 0) {
    opts.actions = actions;
  }

  if (avatar !== '') {
    opts.avatar = avatar;
  }

  Notify.create(opts);
};

const useNotifier = () => {

  const ok = (u: unknown, ...args: string[]) => {
    if (u) {
      console.debug(u);
    }

    if (args.length === 0) return true;

    let symbol: string = `🦁`;
    let msg: string = args[0] as string;
    if (args.length > 1) {
      symbol = msg;
      msg = args[1] as string;
    }

    notify(`${symbolSpan(symbol)}${msg}`, '', []);

    return true;
  };


  const err = (e: AxiosError<Err>, ...args: string[]) => {
    console.error(e);
    let msg = e.response?.data?.error || e?.message;
    if (args.length > 0) {
      msg = args[0] as string;
    }
    if (msg?.includes(`can't access property "data", result is undefined`) || msg?.includes('Cannot read properties of undefined (reading \'data\')')) {
      return false;
    }
    notify(`${symbolSpan(`⛔️`)}${msg}`, '', []);

    return false;
  };

  const warn = (s: string): boolean => {
    notify(`${symbolSpan(`⚠️`)}${s}`, '', []);
    return false;
  };

  const act = (msg: string, avatar: string, actions: QNotifyAction[]): boolean => {
    notify(msg, avatar, actions);
    return true;
  };

  return {
    act,
    ok,
    err,
    warn
  };
};

export default useNotifier;
