import * as flagged from 'flagged';
import { ReactNode } from 'react';
import { useStatePersist } from 'use-state-persist';

import feature_flags from './feature_flags.json';

// https://stackoverflow.com/a/58436959
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '/'}${P}`
    : never
  : never;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
];

type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : '';

//type keys = keyof typeof feature_flags;
type keys = Leaves<typeof feature_flags>;

const STORAGE_KEY = 'feature_flags_v1';

export function useFeatureState(key: string = STORAGE_KEY) {
  const [features, setFeatures] = useStatePersist(key, feature_flags);

  return { features, setFeatures };
}

export function useFeature(name: keys): boolean {
  return flagged.useFeature(name) as boolean;
}

export function useFeatures(): typeof feature_flags {
  return flagged.useFeatures() as typeof feature_flags;
}

export const Feature = flagged.Feature as (props: {
  name: keys;
  children?: ReactNode | ((hasFeature: boolean) => JSX.Element);
  render?: ReactNode | ((hasFeature: boolean) => JSX.Element);
}) => JSX.Element | null;
