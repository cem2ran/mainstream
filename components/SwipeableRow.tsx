import React, { Component, PropsWithChildren } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

type direction = 'left' | 'right';

export default class AppleStyleSwipeableRow extends Component<
  PropsWithChildren<unknown> & {
    onSwipeableOpen: (direction: direction, close: (x: void) => void) => void;
    onSwipeableClose: (direction: direction) => void;
  }
> {
  private renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    _dragAnimatedValue: Animated.AnimatedInterpolation
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
      extrapolate: 'clamp',
    });

    return (
      <View
        style={{
          width: 3,
        }}>
        <Animated.View
          style={[
            styles.rightAction,
            { backgroundColor: '#497AFC', transform: [{ translateX: trans }] },
          ]}>
          <Text style={styles.actionText}>Save</Text>
        </Animated.View>
      </View>
    );
  };

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };
  private close = () => {
    this.swipeableRow?.close();
  };
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={3}
        enableTrackpadTwoFingerGesture
        leftThreshold={40}
        renderLeftActions={this.renderRightActions}
        containerStyle={{
          backgroundColor: '#497AFC',
        }}
        onSwipeableOpen={(direction) => {
          this.props.onSwipeableOpen(direction, this.close);
        }}
        onSwipeableWillClose={this.props.onSwipeableClose}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    width: 100,
    justifyContent: 'center',
  },
});
