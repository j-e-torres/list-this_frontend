import React, { Component, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { ScreenWrapper } from '../../components/screen-wrapper/screen-wrapper';
import { Button } from '../../components/button/button';

import { colors } from '../../../styles';

export const Root: React.FC = () => {
  return (
    <ScreenWrapper>
      <View>
        <Text style={styles.title}>
          Welcome to <Text style={styles.inlineText}>list</Text>THIS
        </Text>
      </View>

      <View style={styles.buttonView}>
        <Button style={styles.buttonWidth}>Login</Button>

        <Button style={styles.buttonWidth}>Sign up</Button>
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
