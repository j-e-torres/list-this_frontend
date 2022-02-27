import React, {Component, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

// import Icon from 'react-native-vector-icons/Entypo

import {colors} from '../../../styles';

export const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [securePassword, setSecurePassword] = useState<boolean>(true);

  const toggleShowPassword = () => setSecurePassword(!securePassword);

  const loginUser = () => {};

  return (
    <KeyboardAvoidingView behavior="padding">
      <View>
        <Text>Welcome Back</Text>
      </View>

      <View>
        <TextInput
          onChangeText={setUsername}
          placeholder='Username'
          value={username}
        />

        <View>
          <TextInput
            onChangeText={setPassword}
            placeholder='Password'
            value={password}
          />

          <TouchableOpacity
            onPress={toggleShowPassword}
          >{/* Icon */}</TouchableOpacity>
        </View>

        <TouchableOpacity onPress={loginUser}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
