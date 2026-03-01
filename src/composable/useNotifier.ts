import { Notify } from 'quasar';
import type { AxiosError } from 'boot/axios';
import type { Err } from 'src/types/model';


const symbolSpan = (s: string): string => `<span style="margin-right: 8px;">${s}</span>`;
const notify = (msg: string) => {
  Notify.create({
    color: 'dark',
    html: true,
    message: `<div class="text-center">${msg}</div>`,
    position: 'top-right',
    textColor: 'white',
    timeout: 5000,
  });
};

const useNotifier = () => {

  const ok = (u: unknown, ...args: string[]) => {
    if (u) {
      console.debug(u);
    }

    if (args.length === 0) return true;

    let symbol:string = `🦁`
    let msg:string = args[0] as string;
    if (args.length > 1) {
      symbol = msg;
      msg = args[1] as string;
    }

    notify(`${symbolSpan(symbol)}${msg}`);

    return true;
  };


  const err = (e: AxiosError<Err>, ...args: string[]) => {
    let msg = e.response?.data?.error || e.message;
    if (args.length > 0) {
      msg = args[0] as string;
    }

    notify(`${symbolSpan(`⛔️`)}${msg}`);

    return false;
  };



  return {
    ok,
    err,
  };
};

export default useNotifier;
