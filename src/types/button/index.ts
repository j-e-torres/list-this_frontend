import {
  StyleProp,
  TextStyle,
  ViewStyle,
  FlexStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Variant } from '../variant';

export interface ButtonStyleProps {
  buttonStyle: StyleProp<ViewStyle> & StyleProp<FlexStyle>;
  buttonTextStyle: StyleProp<TextStyle>;
}

export type ButtonStyles = {
  primary?: ButtonStyleProps;
  secondary?: ButtonStyleProps;
};

export type ButtonStylesContext = {
  variant?: Variant;
  disabled?: boolean;
  width?: number;
};

export interface ButtonProps
  extends JSX.IntrinsicAttributes,
    JSX.IntrinsicClassAttributes<TouchableOpacity>,
    Readonly<TouchableOpacityProps> {
  variant?: Variant;
  disabled?: boolean;
  width?: number;
}
