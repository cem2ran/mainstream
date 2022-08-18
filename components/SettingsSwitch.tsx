import PropTypes from 'prop-types';
import React from 'react';
import { Switch, Text, View } from 'react-native';

import useColors from '../hooks/useColors';

function SettingsSwitch(props: any) {
  const {
    containerProps,
    containerStyle,
    titleProps,
    titleStyle,
    title,
    disabled,
    switchProps,
    disabledOverlayStyle,
    switchWrapperProps,
    switchWrapperStyle,
    value,
    trackColor,
    onValueChange,
    descriptionProps,
    descriptionStyle,
    description,
  } = props;

  const colors = useColors();

  return (
    <View
      {...containerProps}
      style={[
        {
          padding: 0,
          minHeight: 50,
          backgroundColor: colors.background,
          alignItems: 'center',
          flexDirection: 'row',
        },
        containerStyle,
      ]}>
      <View style={{ flex: 1, position: 'relative' }}>
        <Text
          {...titleProps}
          style={[
            {
              flex: 0,
              paddingLeft: 16,
              paddingRight: 8,
              fontSize: 16,
              color: colors.text,
            },
            titleStyle,
          ]}>
          {title}
        </Text>
        {description ? (
          <Text
            {...descriptionProps}
            style={[
              {
                flex: 0,
                paddingLeft: 16,
                paddingRight: 8,
                fontSize: 12,
                color: colors.text,
              },
              descriptionStyle,
            ]}>
            {description}
          </Text>
        ) : null}
        {disabled ? (
          <View
            style={[
              {
                backgroundColor: 'rgba(255,255,255,0.6)',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              },
              disabled ? disabledOverlayStyle : null,
            ]}
          />
        ) : null}
      </View>
      <View
        {...switchWrapperProps}
        style={[
          {
            flex: 0,
            flexDirection: 'row',
            paddingLeft: 8,
            paddingRight: 16,
          },
          switchWrapperStyle,
        ]}>
        <Switch
          value={value}
          trackColor={trackColor}
          onValueChange={onValueChange}
          disabled={disabled}
          {...switchProps}
        />
      </View>
    </View>
  );
}

SettingsSwitch.defaultProps = {
  containerProps: {},
  containerStyle: {},
  disabledOverlayStyle: {},
  titleProps: {},
  titleStyle: {},
  descriptionProps: {},
  descriptionStyle: {},
  description: null,
  switchWrapperProps: {},
  switchWrapperStyle: {},
  disabled: false,
  switchProps: {},
  trackColor: null,
};

SettingsSwitch.propTypes = {
  containerProps: PropTypes.object,
  containerStyle: PropTypes.object,
  disabledOverlayStyle: PropTypes.object,
  titleProps: PropTypes.object,
  titleStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
  descriptionProps: PropTypes.object,
  descriptionStyle: PropTypes.object,
  description: PropTypes.string,
  switchWrapperProps: PropTypes.object,
  switchWrapperStyle: PropTypes.object,
  value: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  trackColor: PropTypes.shape({
    true: PropTypes.string,
    false: PropTypes.string,
  }),
  switchProps: PropTypes.object,
};

export default SettingsSwitch;
