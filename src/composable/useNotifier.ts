import type { QNotifyAction, QNotifyOptions } from 'quasar';
import  { openURL } from 'quasar';
import { Notify } from 'quasar';
import type { AxiosError } from 'boot/axios';
import type { Err } from 'src/types/model';

const options = (msg:string):QNotifyOptions => ({
  color: 'dark',
  html: true,
  message: `<div class="text-right">${msg}</div>`,
  position: 'bottom-right',
  textColor: 'white',
  timeout: 5_000,
  group: false,
})


const symbolSpan = (s: string): string => `<span style="margin-right: 8px;">${s}</span>`;
const notify = (msg: string, avatar?: string, actions?: QNotifyAction[]) => {
  const opts = options(msg);

  if (actions && actions.length !== 0) {
    opts.actions = actions;
    opts.timeout = 10_000
  }

  if (avatar && avatar !== '') {
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
    if (
      msg?.includes(`cancel`) ||
      msg === 'Request failed with status code 401' ||
      msg === 'Request failed with status code 403'
    ) {
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

  const Err = <T = unknown>(e: AxiosError<Err>):T => {
    const msg = e.response?.data?.error || e?.message;
    if (!msg?.includes(`cancel`)) {
      notify(`${symbolSpan(`⛔️`)}${msg}`, '', []);
    }
    return undefined as T
  };

  const Error = (s:string) => {
    const opts = options(s)
    opts.icon = 'mdi-alert-circle-outline'
    opts.iconColor = 'pink-13'
    Notify.create(opts);
  }

  const OK = (s:string):boolean => {
    const opts = options(s)
    opts.icon = 'mdi-check-circle-outline'
    opts.iconColor = 'green-13'
    Notify.create(opts);
    return true;
  }

  const Icon = (msg:string, icon:string, color?:string)=> {
    const opts = options(msg)
    opts.icon = icon
    if (color) {
      opts.iconColor = color;
    }
    Notify.create(opts);
  }

  const Actions = (
    msg: string,
    icon: string,
    color: string,
    actions: QNotifyAction[],
    progress?: boolean,
  ) => {
    const opts = options(msg);
    opts.icon = icon;
    opts.progressClass = `text-${color}`;
    opts.iconColor = color;
    opts.actions = actions;
    opts.progress = progress ?? false;
    return Notify.create(opts);
  };

  const ArticleCreated = (link:string)=> {
    const opts = options('Article Created!');
    opts.avatar = 'https://bytelyon-public.s3.amazonaws.com/shopify.png';
    opts.actions = [
      {
        label: 'View it!',
        textColor: 'light-green',
        handler: () => openURL(link),
      },
    ];
    Notify.create(opts);
  }

  const Message = (s:string) => Notify.create(options(s));

  const Create = (opts:QNotifyOptions) => Notify.create(opts);

  return {
    ArticleCreated,
    notify,
    act,
    ok,
    err,
    warn,
    Err,
    Error,
    OK,
    Icon,
    Message,
    Create,
    Actions,
  };
};

export default useNotifier;
