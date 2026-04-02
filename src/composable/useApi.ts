import { api, type AxiosResponse } from 'boot/axios';
import type { Article } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import { openURL } from 'quasar';
import { Loading } from 'quasar';

type CreateArticleResponse = {
  link: string;
}

const $notify = useNotifier();

const useApi = () => {

  const CreateArticle = async (a: Article): Promise<boolean> => {
    Loading.show({ spinnerColor: 'primary' });
    return await api
      .post(`/bots?type=news`, a)
      .then((res: AxiosResponse<CreateArticleResponse>) => {
        return $notify.act('Article created successfully!', 'https://bytelyon-public.s3.amazonaws.com/shopify.png', [
          {
            label: 'View',
            textColor: 'light-green',
            handler: () => { openURL(res.data.link) }
          }
        ])
      })
      .catch($notify.err)
      .finally(Loading.hide);
  }

  return {
    CreateArticle,
  }
}

export default useApi;
