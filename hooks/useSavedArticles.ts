import { useStatePersist } from 'use-state-persist';

export type Article = { link: string; title: string; published: number };

export default function useSavedArticles(key: string = '@mainstream_saved_articles_v1') {
  const [items, setValue] = useStatePersist<Article[]>(key, []);
  const keys = items.map((x) => x.link);

  const isSaved = (key: string) => keys.includes(key);

  const save = (item: Article) => setValue((items) => [item, ...items]);

  const toggle = (item: Article) => (isSaved(item.link) ? unsave(item) : save(item));

  const reset = () => setValue(() => []);

  const unsave = (item: Article) => setValue((items) => items.filter((x) => x.link !== item.link));

  return { isSaved, unsave, reset, toggle, save, articles: items };
}
