import * as R from 'rambda';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionList } from 'react-native';
import { match } from 'ts-pattern';

import SettingsSwitch from '../components/SettingsSwitch';
import { Text, View } from '../components/Themed';
import { useFeatureState } from '../config/FeatureFlags';
import feature_flags from '../config/feature_flags.json';
import useColorScheme from '../hooks/useColorScheme';
import useColors from '../hooks/useColors';

type sections = keyof typeof feature_flags;

export default function App() {
  const { features, setFeatures } = useFeatureState();
  const { t } = useTranslation('feature_flags');

  const DATA = Object.keys(features).map((section) => {
    const sectionLocale = t(section as sections, { returnObjects: true });

    return {
      title: sectionLocale._title,
      data: Object.keys(feature_flags[section as sections]).map(
        (feature) => `${section}.${feature}`
      ),
    };
  });

  const colors = useColors();
  const colorScheme = useColorScheme();

  //TODO: Move to theme color
  const seperatorColor = match(colorScheme)
    .with('light', (x) => '#f2f2f2')
    .with('dark', (x) => '#333')
    .exhaustive();

  return (
    <SectionList
      sections={DATA}
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      ItemSeparatorComponent={(x) => (
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: seperatorColor,
          }}
        />
      )}
      keyExtractor={(item) => item}
      renderSectionHeader={({ section }) => (
        <View
          style={{
            flex: 1,
            height: 40,
            paddingTop: 7,
            borderBottomColor: seperatorColor,
            borderBottomWidth: 1,
          }}>
          <Text style={{ marginLeft: 14, fontSize: 20, fontWeight: '600' }}>{section.title}</Text>
        </View>
      )}
      renderItem={({ item: key }) => {
        const path = R.lensPath(key);
        return (
          <SettingsSwitch
            key={key}
            title={t(key as any)}
            onValueChange={(value: boolean) => {
              console.log(`toggle:${key}`, value);
              setFeatures(R.set(path, value));
            }}
            value={R.view(path, features)}
          />
        );
      }}
    />
  );
}
