import React, { Component, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenWrapper } from '../../components/screen-wrapper/screen-wrapper';
import { Button } from '../../components/button/button';

import { colors } from '../../../styles';
import {
  RootStackParamList,
  UnauthorizedStackParams,
} from '../../../types/navigation';
import { Variant } from '../../../types';

export const Root = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<UnauthorizedStackParams>>();
  return (
    <ScreenWrapper>
      <View>
        <Text style={styles.title}>
          Welcome to <Text style={styles.inlineText}>list</Text>THIS
        </Text>
      </View>

      <View style={styles.buttonView}>
        <Button
          onPress={() => navigation.navigate('Login')}
          style={styles.buttonWidth}
          variant={Variant.primary}>
          Login
        </Button>

        <Button
          onPress={() => navigation.navigate('Signup')}
          style={styles.buttonWidth}
          variant={Variant.secondary}>
          Sign up
        </Button>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.lightBlack,
  },
  inlineText: {
    fontStyle: 'italic',
  },
  buttonView: {
    justifyContent: 'space-between',
    marginTop: 36,
    alignItems: 'center',
    height: 150,
  },
  buttonWidth: {
    width: 300,
  },
});
