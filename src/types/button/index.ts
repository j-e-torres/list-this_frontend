import {
  StyleProp,
  TextStyle,
  ViewStyle,
  FlexStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Variant } from '../variant';

export type ButtonStyles = {
  buttonStyle: StyleProp<ViewStyle> & StyleProp<FlexStyle>;
  buttonTextStyle: StyleProp<TextStyle>;
};

export type ButtonStylesContext = {
  variant?: Variant;
};

export interface ButtonProps
  extends JSX.IntrinsicAttributes,
    JSX.IntrinsicClassAttributes<TouchableOpacity>,
    Readonly<TouchableOpacityProps> {
  variant?: Variant;
}
