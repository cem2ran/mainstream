import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Image } from 'react-native';

import { RSSMainList } from '../components/MainList';
import Sources from '../constants/Sources';
import { RootTabScreenProps } from '../types';
const Tab = createMaterialTopTabNavigator();

export default function NewsFeedScreen({ navigation }: RootTabScreenProps<'NewsFeed'>) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: false,
        tabBarStyle: {
          backgroundColor: 'grey',
        },
        tabBarItemStyle: {
          width: 42,
          height: 42,
        },
        tabBarContentContainerStyle: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          flex: 1,
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      {Sources.map((source) => (
        <Tab.Screen
          key={source.name}
          name={source.name}
          options={{
            tabBarIconStyle: {
              width: 22,
              height: 22,
            },
            tabBarStyle: {
              backgroundColor: '#111',
            },
            tabBarLabel: ({ focused }) => (
              <Image
                style={{
                  width: 22,
                  height: 22,
                  margin: 6,
                  opacity: focused ? 1 : 0.7,
                }}
                source={{
                  uri: source.icon,
                }}
              />
            ),
          }}
          children={() => <RSSMainList source={source.feed} />}
        />
      ))}
    </Tab.Navigator>
  );
}
