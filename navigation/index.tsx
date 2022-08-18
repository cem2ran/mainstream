/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons as Icon } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ColorSchemeName } from 'react-native';

import IconButton from '../components/IconButton';
import useColors from '../hooks/useColors';
import useReadArticles from '../hooks/useReadArticles';
import useSavedArticles from '../hooks/useSavedArticles';
import ArchiveScreen from '../screens/ArchiveScreen';
import ArticleScreen from '../screens/ArticleScreen';
import ModalScreen from '../screens/ModalScreen';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ReadingListScreen from '../screens/ReadingListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={() => {
          return {
            title: '', //article.title,
            headerBackTitleVisible: false,
          };
        }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function TabNavigator() {
  const colors = useColors();
  const savedArticles = useSavedArticles();
  const readArticles = useReadArticles();
  const { t } = useTranslation();
  const disableSavedListResetButton = savedArticles.articles.length === 0;
  const disableReadListResetButton = readArticles.articles.length === 0;

  return (
    <BottomTab.Navigator
      initialRouteName="NewsFeed"
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name="NewsFeed"
        component={NewsFeedScreen}
        options={({ navigation }: RootTabScreenProps<'NewsFeed'>) => ({
          title: t('news:title'),
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-newspaper-outline" color={color} />,
          // headerRight: () => (
          //   <HoldItem
          //     activateOn="hold"
          //     containerStyles={{ right: 14 }}
          //     items={[
          //       { text: 'Action', isTitle: true, onPress: () => {} },
          //       {
          //         text: 'Home',
          //         icon: () => <Icon name="home" size={18} />,
          //         onPress: () => {},
          //       },
          //       {
          //         text: 'Edit',
          //         icon: () => <Icon name="expand-outline" size={18} />,
          //         onPress: () => {},
          //       },
          //       {
          //         text: 'Delete',
          //         icon: () => <Icon name="remove" size={18} />,
          //         withSeparator: true,
          //         isDestructive: true,
          //         onPress: () => {},
          //       },
          //       {
          //         text: 'Share',
          //         icon: () => <Icon name="share" size={18} />,
          //         onPress: () => {},
          //       },
          //       {
          //         text: 'More',
          //         icon: () => <Icon name="expand-outline" size={18} />,
          //         onPress: () => {},
          //       },
          //     ]}>
          //     <IconButton name="cog-outline" onPress={() => navigation.navigate('Modal')} />
          //   </HoldItem>
          // ),
        })}
      />
      <BottomTab.Screen
        name="Saved"
        component={ReadingListScreen}
        options={{
          title: t('saved:title'),

          tabBarIcon: ({ color }) => <TabBarIcon name="bookmarks-outline" color={color} />,
          headerRight: () => (
            <IconButton
              disabled={disableSavedListResetButton}
              style={{ marginRight: 14 }}
              name="trash-bin"
              onPress={() => {
                Alert.alert(t('saved:clear.title'), t('saved:clear.description'), [
                  {
                    text: t('common:action_cancel'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: t('common:action_accept'), onPress: () => savedArticles.reset() },
                ]);
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Archive"
        component={ArchiveScreen}
        options={{
          title: t('read:title'),
          tabBarIcon: ({ color }) => <TabBarIcon name="archive-outline" color={color} />,
          headerRight: () => (
            <IconButton
              disabled={disableReadListResetButton}
              style={{ marginRight: 14 }}
              name="trash-bin"
              onPress={() => {
                Alert.alert(t('read:clear.title'), t('read:clear.description'), [
                  {
                    text: t('common:action_cancel'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: t('common:action_accept'), onPress: () => readArticles.reset() },
                ]);
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t('settings:title'),
          tabBarIcon: ({ color }) => <TabBarIcon name="cog-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof Icon>['name']; color: string }) {
  return <Icon size={26} style={{ marginBottom: -3 }} {...props} />;
}
