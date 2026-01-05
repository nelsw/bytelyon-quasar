import { type QTreeNode } from 'quasar';
import { decodeTime } from 'ulid';

export interface Prowler {
  id: string;
  type: string;
  prowled: string;
  frequency: number;
  duration: number;
}

export const ProwlerNode = (p: Prowler, c: QTreeNode[]): QTreeNode => {
  return {
    expandable: true,
    id: p.id,
    label: p.id,
    updated: new Date(decodeTime(p.prowled)).toLocaleString(),
    frequency: p.frequency > 0 ? p.frequency / 60000000000 : 0,
    duration: p.frequency > 0 ? p.frequency / 60000000000 : 0,
    children: c,
  };
};

export interface ProwlerNews extends Prowler {
  sessions: ProwlerNewsResult[];
}

export const NewsNodes = (news: ProwlerNews[]): QTreeNode[] => {
  return news.map((p: ProwlerNews): QTreeNode => {

    return ProwlerNode(
      p,
      p.sessions.map((result): QTreeNode => {
        return {
          tickable: true,
          id: result.id,
          label: result.title,
          url: result.url,
          created: new Date(decodeTime(p.prowled)).toLocaleString(),
        };
      }),
    );
  });
};

export interface ProwlerNewsResult {
  id: string;
  source: string;
  title: string;
  url: string;
}

export interface ProwlerSitemap extends Prowler {
  domain: string;
  sessions: ProwlerSitemapResult[];
}

export const SitemapNodes = (sitemaps: ProwlerSitemap[]): QTreeNode[] => {
  return sitemaps.map((sitemap): QTreeNode => {
    let label: string = sitemap.id;
    if (label.startsWith('https://')) {
      label = label.substring(8, label.length);
    }
    if (label.startsWith('www.')) {
      label = label.substring(4, label.length);
    }
    const node = ProwlerNode(
      sitemap,
      sitemap.sessions.map((session): QTreeNode => {
        return {
          id: session.id,
          label: new Date(decodeTime(session.id)).toLocaleString(),
          relative: session.relative,
          remote: session.remote,
        };
      }),
    );
    node.label = label;
    return node;
  });
};

export interface ProwlerSitemapResult {
  id: string;
  domain: string;
  relative: string[];
  remote: string[];
}

const ulidFromUrl = (url: string): string => {
  const idx = url.lastIndexOf('.');
  return url.substring(idx - 26, idx);
};

export const SearchNodes = (searches: ProwlerSearch[]): QTreeNode[] => {
  return searches.map((search): QTreeNode => {
    return ProwlerNode(
      search,
      search.sessions.map((session): QTreeNode => {
        const page: QTreeNode = {
          id: ulidFromUrl(session.html),
          label: new Date(decodeTime(ulidFromUrl(session.html))).toLocaleString(),
          data: session.data,
          screenshot: session.img,
          html: session.html,
        };
        if (session.pages) {
          page.children = session.pages.map((p): QTreeNode => {
            return {
              id: ulidFromUrl(p.html),
              label: p.data.domain,
              title: p.data.title,
              url: p.data.url,
              screenshot: p.img,
              content: p.html,
            };
          });
        }
        return page;
      }),
    );
  });
};

export interface ProwlerSearch extends Prowler {
  sessions: ProwlerSearchPage[];
  targets: Map<string, boolean>;
}

export interface ProwlerSearchPage {
  img: string;
  html: string;
  data: {
    domain: string;
    title: string;
    url: string;
    results?: ProwlerSearchPageResults;
  };
  pages?: ProwlerSearchPage[];
}

export interface ProwlerSearchPageResults {
  also_asked: ProwlerSearchPageResult[];
  article: ProwlerSearchPageResult[];
  forum: ProwlerSearchPageResult[];
  more_products: ProwlerSearchPageResult[];
  organic: ProwlerSearchPageResult[];
  popular_products: ProwlerSearchPageResult[];
  related_query: ProwlerSearchPageResult[];
  sponsored: ProwlerSearchPageResult[];
  video: ProwlerSearchPageResult[];
}

export interface ProwlerSearchPageResult {
  link: string;
  position: number;
  snippet: string;
  source: string;
  price?: string
  title: string;
}

export enum SearchPageResultType {
  Sponsored = "Sponsored",
  Organic = "Organic",
  AlsoAsked = "AlsoAsked",
  Article = "Article",
  Forum = "Forum",
  MoreProducts = "MoreProducts",
  PopularProducts = "PopularProducts",
  RelatedQuery = "RelatedQuery",
  Video = "Video",
}
