import { useStatePersist } from 'use-state-persist';

import { Article } from './useSavedArticles';

export default function useReadArticles() {
  const [items, setValue] = useStatePersist<Article[]>('@mainstream_read_articles_v00', []);
  const keys = items.map((x) => x.link);

  const isRead = (key: string) => keys.includes(key);

  const read = (item: Article) => !isRead(item.link) && setValue((items) => [item, ...items]);

  const reset = () => setValue(() => []);

  return { isRead, reset, read, articles: items };
}
