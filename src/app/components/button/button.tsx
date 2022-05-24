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
import {
  ButtonProps,
  ButtonStyles,
  ButtonStylesContext,
} from '../../../types/button';
import { getStyles } from './button.styles';
import { createUseStyles } from '../../../utils/create-use-styles';

const useStyles = createUseStyles<ButtonStylesContext, ButtonStyles>(getStyles);

export const Button = (props: ButtonProps) => {
  const getStyle = useStyles({ variant: props.variant });
  return (
    <TouchableOpacity {...props} style={[getStyle?.buttonStyle, props.style]}>
      <Text style={[getStyle?.buttonTextStyle]}>{props.children}</Text>
    </TouchableOpacity>
  );
};
