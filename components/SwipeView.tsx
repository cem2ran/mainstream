import React from 'react';
import { Dimensions, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

interface Props {
  children: React.ReactNode;
  backView?: React.ReactNode;
  onSwipeLeft?: () => void;
  simultaneousHandlers?: React.Ref<unknown>;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.2;

const SwipeView = (props: Props) => {
  const { children, backView, onSwipeLeft } = props;
  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = Math.max(-SCREEN_WIDTH, Math.min(0, event.translationX));
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < SWIPE_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        onSwipeLeft && runOnJS(onSwipeLeft)();
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const facadeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <Animated.View style={{ flex: 1 }}>
      {backView && (
        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          {backView}
        </View>
      )}
      <PanGestureHandler
        // enableTrackpadTwoFingerGesture
        // simultaneousHandlers={props.simultaneousHandlers}
        activeOffsetX={[-5, 5]}
        onGestureEvent={panGesture}>
        <Animated.View style={facadeStyle}>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default SwipeView;
