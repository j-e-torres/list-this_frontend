import { FlexStyle, TextStyle, ViewStyle } from 'react-native';
import { colors } from '../../../styles';
import { ButtonStylesContext, ButtonStyles } from '../../../types/button';

// https://orangeloops.com/2020/10/improved-conditional-styling-in-react-native/

export const getStyles = (context: ButtonStylesContext): ButtonStyles => {
  const { disabled, width } = context;

  const sharedButtonStyles: ViewStyle & FlexStyle = {
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    width,
    opacity: disabled ? 0.4 : 1,
  };

  const sharedButtonTextStyles: TextStyle = {
    fontSize: 25,
  };

  return {
    primary: {
      buttonStyle: [
        {
          ...sharedButtonStyles,
          borderColor: colors.darkOrange,
          backgroundColor: colors.darkOrange,
        } as ViewStyle & FlexStyle,
      ],
      buttonTextStyle: [{ ...sharedButtonTextStyles, color: colors.white }],
    },
    secondary: {
      buttonStyle: [
        { ...sharedButtonStyles, borderColor: colors.darkOrange } as ViewStyle &
          FlexStyle,
      ],
      buttonTextStyle: [
        { ...sharedButtonTextStyles, color: colors.lightOrange },
      ],
    },
  };
};
