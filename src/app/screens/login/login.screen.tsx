import React, { Component, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import { ScreenWrapper } from '../../components/screen-wrapper/screen-wrapper';
import { Button } from '../../components/button/button';

// import Icon from 'react-native-vector-icons/Entypo

import { colors } from '../../../styles';

export const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [securePassword, setSecurePassword] = useState<boolean>(true);

  const toggleShowPassword = () => setSecurePassword(!securePassword);

  const loginUser = () => {};

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView behavior="padding">
      <View>
        <Text style={styles.title}>Welcome Back</Text>
      </View>

      <View>
        <TextInput
          onChangeText={setUsername}
          placeholder="Username"
          value={username}
          style={styles.input}
        />

        <View>
          <TextInput
            onChangeText={setPassword}
            placeholder="Password"
            value={password}
            secureTextEntry={securePassword}
            style={styles.input}

          />

          <TouchableOpacity onPress={toggleShowPassword}>
            {/* Icon */}
          </TouchableOpacity>
        </View>

        <Button>Login</Button>
        {/* <TouchableOpacity onPress={loginUser}>
          <Text>Login</Text>
        </TouchableOpacity> */}
      </View>
    </KeyboardAvoidingView>
    </ScreenWrapper>

  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.lightBlack,
    marginBottom: 30,
  },

  input: {
    height: 50,
    marginBottom: 30,
    padding: 4,
    fontSize: 25,
    borderBottomWidth: 1,
    borderColor: colors.lightOrange,
    color: colors.lightBlack,
  }
});
