import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Share, Animated, Platform, Dimensions, PixelRatio } from 'react-native';
//@ts-ignore
import CleanWebView from 'react-native-clean-webview';
import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {
  HeaderButton,
  HeaderButtonProps,
  HeaderButtons,
  Item,
} from 'react-navigation-header-buttons';

import IconButton from '../components/IconButton';
import { Feature } from '../config/FeatureFlags';
import useColors from '../hooks/useColors';
import useSavedArticles, { Article } from '../hooks/useSavedArticles';
import { RootStackScreenProps } from '../types';
import { toggleBionicReading } from '../vendored/toggleBionicReading';

type parsedArticle = {
  title: string;
  byline: string;
  dir: string;
  content: string;
  textContent: string;
  length: number;
  excerpt: string;
  siteName: string;
};

const AnimatedWebView = Animated.createAnimatedComponent(WebView);
const AnimatedCleanWebView: typeof AnimatedWebView = Animated.createAnimatedComponent(CleanWebView);

const IoniconsHeaderButton = (props: HeaderButtonProps) => {
  const colors = useColors();

  return (
    // the `props` here come from <Item ... />
    // you may access them and pass something else to `HeaderButton` if you like
    <HeaderButton IconComponent={Ionicons} iconSize={23} color={colors.text} {...props} />
  );
};

const HeaderRight = ({
  toggleReading,
  togglePlayback,
  article,
  showReaderOptions,
}: {
  toggleReading: () => void;
  togglePlayback: (
    isPlaying: boolean,
    onDone: () => Speech.SpeechEventCallback | void
  ) => Promise<boolean>;
  article: Article;
  showReaderOptions: boolean;
}) => {
  const [bionicReadingOn, setBionicReading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isSaved, toggle } = useSavedArticles();
  return (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      {showReaderOptions ? (
        <>
          <Item
            title="play"
            iconName={
              isPlaying
                ? Platform.select({ ios: 'pause-circle-outline', android: 'stop-circle-outline' })
                : 'play-circle-outline'
            }
            onPress={() => {
              togglePlayback(isPlaying, () => setIsPlaying(false)).then(setIsPlaying);
            }}
          />
          <Item
            title="bionic"
            iconName={bionicReadingOn ? 'eye' : 'eye-outline'}
            onPress={() => {
              setBionicReading((on) => !on);
              toggleReading();
            }}
          />
        </>
      ) : null}
      <Item
        title="save/unsave"
        iconName={isSaved(article.link) ? 'bookmark' : 'bookmark-outline'}
        onPress={() => toggle(article)}
      />
    </HeaderButtons>
  );
};

function ProgressBar({
  y,
  webViewHeightRef,
  height = 5,
  color = '#497AFC',
}: {
  y: React.MutableRefObject<Animated.Value>;
  webViewHeightRef: React.MutableRefObject<Animated.Value>;
  height?: number;
  color?: string;
}) {
  const [webViewHeight, setHeight] = useState(0);
  const heightListener = webViewHeightRef.current.addListener((x) => {
    setHeight(x.value);
  });

  const progressBarWidth = y.current.interpolate({
    inputRange: [0, webViewHeight],
    outputRange: [0, Dimensions.get('window').width + PixelRatio.get() * 70],
  });

  useEffect(() => {
    return () => webViewHeightRef.current.removeListener(heightListener);
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height,
        backgroundColor: color,
        width: progressBarWidth,
      }}
    />
  );
}

export default function ArticleScreen({ route }: RootStackScreenProps<'Article'>) {
  const article = route.params;
  const { link } = article;
  const y = useRef(new Animated.Value(0));
  const webViewHeightRef = useRef(new Animated.Value(0));

  const [canGoBack, setCanGoBack] = useState(false);
  const [renderWebview, setRenderWebview] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const [textContent, setTextContent] = useState<string | null>(null);

  const showReaderOptions = Boolean(textContent?.length);

  const navigation = useNavigation();
  const webViewRef = useRef<WebView>();

  useEffect(() => {
    return () => {
      console.log('Unmount -> Speech.stop');
      Speech.stop();
    };
  }, [textContent]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // in your app, you can extract the arrow function into a separate component
      // to avoid creating a new one every time you update the options
      headerRight: () => (
        <HeaderRight
          article={article}
          showReaderOptions={showReaderOptions}
          toggleReading={() => {
            webViewRef.current?.injectJavaScript(`${toggleBionicReading}()`);
          }}
          togglePlayback={async (
            isPlaying: boolean,
            onDone: () => Speech.SpeechEventCallback | void
          ) => {
            const isSpeaking = await Speech.isSpeakingAsync();

            const play = () => {
              if (!isSpeaking || Platform.OS === 'android') {
                console.log('speak');
                return Speech.speak(textContent || '', {
                  onDone,
                  onMark: (mark) => console.log({ mark }),
                  onBoundary: (boundary) => console.log({ boundary }),
                });
              } else {
                console.log('resume');
                return Speech.resume();
              }
            };

            if (isPlaying) {
              if (Platform.OS === 'android') {
                console.log('stop');
                await Speech.stop();
              } else {
                console.log('pause');
                await Speech.pause();
              }

              return false;
            } else {
              console.log('play');
              await play();
              return true;
            }
          }}
        />
      ),
    });
  }, [navigation, webViewRef, article, textContent, showReaderOptions]);

  const insets = useSafeAreaInsets();

  const colors = useColors();
  const backgroundColor = colors.background;

  const handleBackPress = () => {
    webViewRef?.current?.goBack();
  };
  const handleForwardPress = () => {
    webViewRef?.current?.goForward();
  };

  const handleSharePress = useCallback(() => {
    Share.share({ url: link });
  }, [link]);

  const handleBrowserPress = useCallback(() => {
    WebBrowser.openBrowserAsync(link);
  }, [link]);

  //NOTE: Fix for bounce problem: https://stackoverflow.com/a/68982921
  const minScroll = 150;
  const headerHeight = 60 + insets.bottom;
  const activeRange = 300;

  const diffClamp = Animated.diffClamp(y.current, -minScroll, activeRange + minScroll);
  const headerDistance = diffClamp.interpolate({
    inputRange: [0, activeRange],
    outputRange: [0, headerHeight],
    extrapolate: 'clamp',
  });

  const SelectedWebView = renderWebview ? AnimatedWebView : AnimatedCleanWebView;
  const SelectedWebViewProps = renderWebview
    ? { source: { uri: link } }
    : {
        url: link,
        htmlCss: css,
        style: { backgroundColor: '#f5f5f5' },
        onCleaned: ({ textContent }: parsedArticle) => {
          setTextContent(textContent);
        },
      };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
      }}>
      <SelectedWebView
        ref={webViewRef}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentSize: { height: webViewHeightRef.current },
                contentOffset: { y: y.current },
              },
            },
          ],
          {
            //BUG: unable to set to true or use re-animated
            useNativeDriver: false,
          }
        )}
        contentInset={{ bottom: 60 }}
        onNavigationStateChange={(state: any) => {
          setCanGoBack(state.canGoBack);
          setCanGoForward(state.canGoForward);
        }}
        pullToRefreshEnabled
        onError={(error: any) => {
          Toast.show('ClearView unsupported, switching to WebView...', {
            duration: Toast.durations.LONG,
          });
          console.log(error);
          setRenderWebview(true);
        }}
        {...SelectedWebViewProps}
      />
      <Feature name="reader/progress_bar">
        <ProgressBar y={y} webViewHeightRef={webViewHeightRef} />
      </Feature>
      <Animated.View
        style={[
          {
            backgroundColor,
            height: 60 + insets.bottom / 2,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            position: 'absolute',
            bottom: 0,
            paddingBottom: insets.bottom / 2,
          },
          {
            transform: [
              {
                translateY: headerDistance,
              },
            ],
          },
        ]}>
        <IconButton disabled={!canGoBack} name="chevron-back" onPress={handleBackPress} />
        <IconButton disabled={!canGoForward} name="chevron-forward" onPress={handleForwardPress} />
        <IconButton name="share-outline" onPress={handleSharePress} />
        <IconButton name="compass-outline" onPress={handleBrowserPress} />
      </Animated.View>
    </View>
  );
}

const css = `
html {
    background-color: #f5f5f5;
    font-family: 'Bookerly', sans-serif;
  }
  
  body {
    padding: 10px;
    overflow-x: hidden;
  }
  
  img {
    width: 100%;
    max-height: 200px;
    object-fit: contain;
  }
  
  figure {
    margin: 0;
    padding: 0;
  }

  img.emoji {
    display: inline;
    height: 1em;
    width: 1em;
    margin: 0 0.05em 0 0.1em;
    vertical-align: -0.1em;
  }
  
  a {
    text-decoration: none !important;
    color: inherit !important;
  }
  
  p {
    margin-bottom: 0.5em !important;
    text-indent: 0 !important;
  }
  
  blockquote {
    margin-bottom: 0.5em !important;
  }
  
  h1 {
    margin-bottom: 1em !important;
    margin-top: 1em !important;
  }
  
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 0.5em !important;
  }
  
  hr {
    border: 0 !important;
    height: 1px !important;
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    background: #333 !important;
    background-image: linear-gradient(to right, #ccc, #333, #ccc) !important;
  }
  `;
