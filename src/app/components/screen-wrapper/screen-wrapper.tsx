import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as colors from '../../../styles/colors';

export const ScreenWrapper = (props) => {
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
