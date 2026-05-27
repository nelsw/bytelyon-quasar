import { api } from 'boot/axios';
import { type Snippet } from 'src/types/snippet';

const useSitemapsApi = () => {
  const getUrls = async (domain: string) => {
    return await api.get<string[]>(`/sitemaps?domain=${domain}`).then((r) => r.data);
  };
  const getSnippets = async (domain: string, url:string) => {
    return await api.get<Snippet[]>(`/sitemaps?domain=${domain}&url=${url}`).then((r) => r.data);
  }
  return {
    getUrls,
    getSnippets,
  };
};

export default useSitemapsApi;
