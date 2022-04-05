import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import * as colors from '../../../styles/colors';

export const ScreenWrapper = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<View> &
    Readonly<ViewProps> &
    Readonly<{ children?: React.ReactNode }>,
) => {
  return (
    <View {...props} style={[styles.wrapper, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    flex: 1,
    backgroundColor: colors.white,
  },
});
