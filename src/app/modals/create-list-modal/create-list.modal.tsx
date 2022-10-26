import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors.ts';

import { ScreenWrapper } from '../../components/screen-wrapper/screen-wrapper';

import { Button } from '../../components/button/button';
import { colors } from '../../../styles';

import { RootStackParamList } from '../../../types/navigation';

export const CreateListModal: React.FC = () => {
  const authNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'AuthStack'>>();

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView behavior="padding">
        <View>
          <Text onPress={() => authNavigation.goBack()}>CreateList</Text>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};
