import { StyleSheet } from 'react-native';
import { colors } from '../../../styles';
import { ButtonStylesContext, ButtonStyles } from '../../../types/button';
import { Variant } from '../../../types/variant';

const sharedButtonStyles = {
  alignItems: 'center',
  padding: 10,
  borderRadius: 50,
  borderWidth: 1,
};

const sharedButtonTextStyles = {
  fontSize: 25,
};

export const getStyles = (context: ButtonStylesContext): ButtonStyles | any => {
  switch (context.variant) {
    case Variant.secondary:
      return {
        buttonStyle: [
          { ...sharedButtonStyles, borderColor: colors.darkOrange },
        ],
        buttonTextStyle: [
          { ...sharedButtonTextStyles, color: colors.lightOrange },
        ],
      };
    // default is primary
    case Variant.primary:
      return {
        buttonStyle: [
          {
            ...sharedButtonStyles,
            borderColor: colors.darkOrange,
            backgroundColor: colors.darkOrange,
          },
        ],
        buttonTextStyle: [{ ...sharedButtonTextStyles, color: colors.white }],
      };
  }
};
