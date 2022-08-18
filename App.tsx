import './polyfills';

import Providers from './config/Providers';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Providers>
        <Navigation colorScheme={colorScheme} />
      </Providers>
    );
  }
}
