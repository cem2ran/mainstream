import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Feature } from '../config/FeatureFlags';
import useColors from '../hooks/useColors';
import { View, Text } from './Themed';

type Props = {
  title: string;
  published: number;
  read: boolean;
  toggle: () => void;
  isSaved: boolean;
};

export default function ListItem({ title, published, read, toggle, isSaved }: Props) {
  const colors = useColors();

  return (
    <View>
      <View style={[styles.row, read && { opacity: 0.8 }]}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.description}>{new Date(published).toDateString()}</Text>
        <Feature name="save/press_icon_to_save">
          <TouchableOpacity onPress={toggle}>
            {isSaved ? (
              <Ionicons name="bookmark" size={20} color={colors.text} />
            ) : (
              <>
                <Ionicons name="bookmark-outline" size={20} color={colors.text} />
                <Ionicons
                  name="add"
                  size={12}
                  color={colors.text}
                  style={{
                    backgroundColor: colors.background,
                    borderRadius: 8,
                    position: 'absolute',
                    right: -2,
                    top: -4,
                  }}
                />
              </>
            )}
          </TouchableOpacity>
        </Feature>
      </View>

      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingLeft: 14,
    paddingRight: 14,
    alignItems: 'center',
  },
  title: {
    paddingTop: 10,
    paddingBottom: 20,
    fontSize: 15,
    flex: 1,
  },
  description: {
    color: '#B4AEAE',
    fontSize: 12,
    position: 'absolute',
    left: 14,
    bottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});
