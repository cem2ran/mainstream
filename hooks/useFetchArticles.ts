import { useEffect, useState } from 'react';
import { parse } from 'rss-to-json';

export type fetchedArticle = {
  title: string;
  description: string;
  link: string;
  published: number;
  created: number;
  // "category": [],
  // "enclosures": [],
  // "media": {}
};

export type fetchedItem = {
  title: string;
  description: string;
  link: string;
  image: any;
  category: any;
  items: fetchedArticle[];
};

export default function useFetchArticles(rssSource: string) {
  const [state, setState] = useState<{ loading: boolean; ts: number; articles: fetchedArticle[] }>({
    loading: false,
    ts: Date.now(),
    articles: [],
  });

  const refresh = () => setState((state) => ({ ...state, ts: Date.now() }));

  useEffect(() => {
    setState({ ...state, loading: true });
    parse(rssSource, {})
      .then((rss) => {
        setState({ ...state, loading: false, articles: rss.items });
      })
      .catch(() => {
        setState({ ...state, loading: false });
      });
  }, [rssSource, state.ts]);

  return {
    refresh,
    loading: state.loading,
    articles: state.articles,
  };
}
