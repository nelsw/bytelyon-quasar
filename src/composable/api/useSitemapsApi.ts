import { api } from 'boot/axios';
import { type Snippet } from 'src/types/snippet';

const u = '/sitemaps'

const useSitemapsApi = () => {
  return {
    getUrls: async (domain: string) =>
      await api.get<string[] | null>(u, { params: { domain } }).then((r) => r.data ?? []),
    getSnippets: async (domain: string, url: string) =>
      await api.get<Snippet[] | null>(u, { params: { domain, url } }).then((r) => r.data ?? []),
  };
};

export default useSitemapsApi;
