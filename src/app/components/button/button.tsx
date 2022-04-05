import React, { Component, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableOpacityProps,
} from 'react-native';

import * as colors from '../../../styles/colors';

export const Button = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<TouchableOpacity> &
    Readonly<TouchableOpacityProps> &
    Readonly<{ children?: React.ReactNode }>,
) => {
  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      <Text style={[styles.buttonText]}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    borderColor: colors.darkOrange,
    borderWidth: 1,
  },
  buttonText: {
    color: colors.lightOrange,
    fontSize: 25,
  },
});
