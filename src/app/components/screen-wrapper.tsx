import React from 'react';
import { View } from 'react-native';

export const ScreenWrapper = (props) => {
  return(
    <View {...props} style={[{ padding: 10 }, props.style]}>
      {props.children}
    </View>
  )
}
