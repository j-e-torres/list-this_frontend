import React, { Component, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { getStoredToken } from '../../../utils/async-storage';

import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors.ts';

import { ScreenWrapper } from '../../components/screen-wrapper/screen-wrapper';
import { Button } from '../../components/button/button';

import { sliceKey, reducer } from '../../../stores/auth/slice/auth.slice';
import { userLoginSaga } from '../../../stores/auth/sagas/auth.saga';
import { AuthFacadeService } from '../../../stores/auth/facades/auth.facade';

import { colors } from '../../../styles';

export const Login = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: userLoginSaga });

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [securePassword, setSecurePassword] = useState<boolean>(true);

  const { login } = AuthFacadeService();

  const toggleShowPassword = () => setSecurePassword(!securePassword);

  // useEffect(() => {
  //   const userLogin = () => {
  //     login({ username, password });
  //   };

  //   userLogin();
  // });

  const loginUser = () => {
    login({ username, password });
    // console.log('login pressed', res);
    const wee = setInterval(() => {
      console.log('GOKU', getStoredToken());
      clearInterval(wee);
    }, 5000);
  };

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

          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
            }}>
            <TextInput
              onChangeText={setPassword}
              placeholder="Password"
              value={password}
              secureTextEntry={securePassword}
              style={[styles.input, { flex: 1 }]}
            />

            <Icon
              name={securePassword ? 'eye' : 'eye-with-line'}
              size={20}
              color={colors.lightBlack}
              style={[styles.input]}
              onPress={toggleShowPassword}
            />
          </View>

          <Button onPress={loginUser}>Login</Button>
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
  },
});
