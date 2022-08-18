import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import useColors from '../hooks/useColors';

export interface IconButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  name: React.ComponentProps<typeof Ionicons>['name'];
  size?: number;
}

export default function IconButton({ name, disabled, size = 25, ...props }: IconButtonProps) {
  const colors = useColors();
  return (
    <TouchableOpacity style={{ opacity: disabled ? 0.5 : 1 }} disabled={disabled} {...props}>
      <Ionicons name={name} size={size} color={colors.text} />
    </TouchableOpacity>
  );
}
