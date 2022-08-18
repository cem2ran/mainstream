import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import React from 'react';
import { RefreshControl, View, LayoutAnimation } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useFeature, useFeatures } from '../config/FeatureFlags';
import useColors from '../hooks/useColors';
import useFetchArticles from '../hooks/useFetchArticles';
import useReadArticles from '../hooks/useReadArticles';
import useSavedArticles, { Article } from '../hooks/useSavedArticles';
import ListItem from './ListItem';
import Pressable from './Pressable';
import SwipeView from './SwipeView';

export const RSSMainList = (props: { source: string }) => {
  const { loading, articles: fetchedArticles, refresh } = useFetchArticles(props.source);
  const { isSaved } = useSavedArticles();
  const hideSavedItemFeature = useFeature('save/hide_saved_items');

  const articles = hideSavedItemFeature
    ? fetchedArticles.filter((x) => !isSaved(x.link))
    : fetchedArticles;

  return <MainList loading={loading} articles={articles} refresh={refresh} />;
};

export const ReadMainList = () => {
  const { articles } = useReadArticles();

  return <MainList articles={articles} loading={false} />;
};

export const SavedMainList = () => {
  const { articles } = useSavedArticles();

  return <MainList articles={articles} loading={false} />;
};

export default function MainList(
  props: {
    refresh?: () => void;
    loading: boolean;
    articles: Article[];
  } = { loading: false, articles: [] }
) {
  const ref = React.useRef(null);

  useScrollToTop(ref);
  const navigation = useNavigation();
  const { toggle, isSaved } = useSavedArticles();
  const { isRead, read } = useReadArticles();
  const colors = useColors();

  const features = useFeatures();

  const renderItem = ({ item }: { item: Article }) => {
    const onRemove = () => {
      setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        toggle(item);
      }, 200);
    };
    // <SwipeableRow
    //   onSwipeableOpen={(direction, close) => {
    //     if (direction === 'left') {
    //       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //       // eslint-disable-next-line no-unused-expressions
    //       if (isSaved(item.link)) {
    //         unsave(item);
    //         close();
    //       } else {
    //         save(item);
    //       }
    //     }
    //   }}
    //   onSwipeableClose={(direction) => {
    //     console.log('close');
    //     // if (isSaved(item.link)) {
    //     //   unsave(item);
    //     // }
    //   }}>

    const pressableProps = features.save.hold_to_save
      ? {
          onLongPress: () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            toggle(item);
          },
          onLongPressOverlay: (
            <Ionicons
              name="ios-bookmark-sharp"
              size={20}
              color={colors.text}
              style={{ position: 'absolute', top: -3, right: 0 }}
            />
          ),
        }
      : {};

    const listItem = (
      <Pressable
        {...pressableProps}
        onPress={() => {
          read(item);
          navigation.navigate('Article', item);
        }}>
        <ListItem
          {...item}
          read={isRead(item.link)}
          isSaved={isSaved(item.link)}
          toggle={() => toggle(item)}
        />
      </Pressable>
    );

    return features.save.swipe_to_save ? (
      <SwipeView
        onSwipeLeft={onRemove}
        backView={
          <View
            style={{
              flex: 1,
              backgroundColor: '#497AFC',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingRight: 4,
            }}>
            <Ionicons
              name={isSaved(item.link) ? 'remove-circle-sharp' : 'bookmark-sharp'}
              size={22}
              color="white"
              style={{ marginBottom: -3 }}
            />
          </View>
        }>
        {listItem}
      </SwipeView>
    ) : (
      listItem
    );
  };

  const refreshControl = props.refresh && (
    <RefreshControl refreshing={props.loading} onRefresh={props.refresh} />
  );

  return (
    <FlatList
      data={props.articles}
      ref={ref}
      refreshing={props.loading}
      keyExtractor={(item) => item.link}
      renderItem={renderItem}
      initialNumToRender={15}
      refreshControl={refreshControl}
    />
  );
}
