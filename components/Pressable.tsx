import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface PressBoxProps {
  onLongPress?: () => void;
  onLongPressOverlay?: React.ReactElement;
  onPress?: () => void;
  children: React.ReactElement;
}

const PressBox = (props: PressBoxProps) => {
  const [pressed, setOnPress] = useState(false);
  const [longPressed, setOnLongPress] = useState(false);

  return (
    <TouchableWithoutFeedback
      style={{ opacity: pressed ? 0.95 : 1 }}
      onPressIn={() => {
        setOnPress(true);
      }}
      delayPressIn={150}
      onPressOut={() => {
        if (longPressed) {
          setOnLongPress(false);
          props.onLongPress?.();
        } else {
          setOnPress(false);
          props.onPress?.();
        }
      }}
      delayLongPress={500}
      onLongPress={async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setOnLongPress(true);
      }}>
      {props.children}
      {longPressed ? props.onLongPressOverlay : null}
    </TouchableWithoutFeedback>
  );
};

export default PressBox;
