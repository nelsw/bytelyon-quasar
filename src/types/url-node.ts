import { uid } from 'quasar';

interface Data {
  id: string;
  label: string;
  url: string;
  children: Data[];
}

interface Node extends Data {
  kids: Map<string, Node>;
}

export type UrlNode = Data;

const ToUrlNode = (n: Node): UrlNode => {
  const q: Data = {
    id: n.id,
    label: n.label,
    url: n.url,
    children: [],
  };

  for (const k of n.kids.values()) {
    q.children?.push(ToUrlNode(k));
  }
  return q;
};

const NewNode = (label: string, url?: string): Node => {
  return {
    id: uid(),
    label: label,
    url: url ?? '',
    kids: new Map(),
    children: [],
  };
};

export const FromURLs = (urls: string[]): UrlNode[] => {
  const root = NewNode('');

  for (const url of urls) {
    let node: Node = root;

    let uri: string = url.split('https://').pop() as string;

    for (let idx = uri.indexOf('/'); idx >= 0; idx = uri.indexOf('/')) {
      const label = uri.substring(0, idx);
      if (!node.kids.has(label)) {
        node.kids.set(label, NewNode(label));
      }
      node = node.kids.get(label) as Node;
      uri = uri.substring(idx + 1);
    }

    let n: Node;
    if (!node.kids.has(uri)) {
      n = NewNode(uri);
    } else {
      n = node.kids.get(uri) as Node;
    }
    n.url = url;
    node.kids.set(uri, n);
  }

  return ToUrlNode(root).children;
};
