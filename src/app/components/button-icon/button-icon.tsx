import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { ButtonIconProps } from '../../../types';

export const ButtonIcon = (props: ButtonIconProps) => {
  const { iconName, iconSize, color, buttonText, onPressFunction } = props;

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => onPressFunction()}>
      <Icon name={iconName} size={iconSize} color={color} />
      <Text style={{ color: color }}>{buttonText}</Text>
    </TouchableOpacity>
  );
};
