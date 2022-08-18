import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { FlagsProvider } from 'flagged';
import React from 'react';
import { HoldMenuProvider } from 'react-native-hold-menu';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useColorScheme from '../hooks/useColorScheme';
import { useFeatureState } from './FeatureFlags';

export default function Providers({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const { features } = useFeatureState();

  return (
    <FlagsProvider features={features}>
      <HoldMenuProvider theme={colorScheme} iconComponent={Ionicons} blur={false}>
        <RootSiblingParent>
          <SafeAreaProvider>
            {children}
            <StatusBar />
          </SafeAreaProvider>
        </RootSiblingParent>
      </HoldMenuProvider>
    </FlagsProvider>
  );
}
