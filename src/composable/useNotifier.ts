import { Notify } from 'quasar';
import { useLogger } from 'src/composable/useLogger';
const $log = useLogger();
const useNotifier = () => {

  const ok = (u:unknown, s:string, update:boolean) => {
    $log.info(u, s);
    Notify.create({
      message: `${s} ${update ? 'Updated' : 'Created'} successfully`,
      color: 'dark',
      icon: 'mdi-check',
      textColor: `${update ? 'amber' : 'green'}-13`,
    });
  }

  const err = (e:Error, s: string) => {
    $log.err(e, s);
    Notify.create({
      classes: 'text-center',
      html: true,
      message: `Failed to ${s};<br>Contact the ByteLyon tamer.`,
      icon: 'mdi-alert-circle',
      textColor: 'red-13',
    });
  };

  return {
    ok,
    err,
  }
}

export default useNotifier;
