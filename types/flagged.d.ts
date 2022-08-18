// NOTE: Couldn't make this work properly with declaration merging as we need to override instead of overloading `useFeature` because it falls back to the existing function excepting a string as input, which breaks type safety.
// May be possible to override FeatureGroup which is the return type. May be worth trying again as I couldn't make it work on first try.

// import feature_flags from '../config/feature_flags.json';

// // https://stackoverflow.com/a/58436959
// // type Join<K, P> = K extends string | number
// //   ? P extends string | number
// //     ? `${K}${'' extends P ? '' : '/'}${P}`
// //     : never
// //   : never;

// // type Leaves<T, D extends number = 10> = [D] extends [never]
// //   ? never
// //   : T extends object
// //   ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
// //   : '';

// type keys = keyof typeof feature_flags;
// // type keys = Leaves<typeof feature_flags>;

// export declare module 'flagged' {
//   export declare function useFeature(name: keys): boolean;
//   export declare function useFeatures(): typeof feature_flags;
// }
