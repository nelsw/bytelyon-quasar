import { Notify } from 'quasar';
import { useLogger } from 'src/composable/useLogger';
const $log = useLogger();
const useNotifier = () => {

  const ok = (u:unknown, s:string) => {
    $log.info(u, s);
    Notify.create({
      message: s,
      color: 'dark',
      icon: 'mdi-check',
      position: 'top-right',
      textColor: 'primary',
    });
  }

  const err = (e:Error, ...args: string[]) => {
    $log.err(e, ...args);
    let msg = `Failed to ${args[0]};<br>`;
    if (args.length > 1) {
      msg += `${args[1]}`;
    } else {
      msg += `Contact the ByteLyon tamer.`;
    }
    Notify.create({
      classes: 'text-center',
      html: true,
      message: msg,
      icon: 'mdi-alert-circle',
      textColor: 'red-13',
      position: 'top-right',
      color: 'dark',
    });
  };

  return {
    ok,
    err,
  }
}

export default useNotifier;
