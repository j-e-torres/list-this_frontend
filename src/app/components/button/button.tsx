import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import {
  ButtonProps,
  ButtonStyles,
  ButtonStylesContext,
} from '../../../types/button';
import { getStyles } from './button.styles';
import { createUseStyles } from '../../../utils/create-use-styles';
import { Variant, ButtonStyleProps } from '../../../types';

const useStyles = createUseStyles<ButtonStylesContext, ButtonStyles>(getStyles);

export const Button = (props: ButtonProps) => {
  const getStyle = useStyles({ ...props });

  const getButtonVariantStyle = (): ButtonStyleProps | undefined => {
    switch (props.variant) {
      case Variant.secondary:
        return getStyle.secondary;
      // Primary Variant
      default:
        return getStyle.primary;
    }
  };

  const buttonVariantStyle = getButtonVariantStyle();

  return (
    <TouchableOpacity
      {...props}
      style={[buttonVariantStyle?.buttonStyle, props.style]}>
      <Text style={[buttonVariantStyle?.buttonTextStyle]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};
