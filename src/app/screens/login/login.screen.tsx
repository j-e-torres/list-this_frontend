import React, { useState, useEffect } from 'react';
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

import { sliceKey, reducer } from '../../../stores/auth/slice/auth.slice';
import { userLoginSaga } from '../../../stores/auth/sagas/auth.saga';
import { AuthFacadeService } from '../../../stores/auth/facades/auth.facade';

import { colors } from '../../../styles';
import { ErrorTypes, Variant, NavigationTypes } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const Login: React.FC = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: userLoginSaga });

  const navigation =
    useNavigation<
      NativeStackNavigationProp<NavigationTypes.RootStackParamList, 'AuthStack'>
    >();

  const { login, authError, clearError, authUser } = AuthFacadeService();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<ErrorTypes.AllErrors>(null);
  const [securePassword, setSecurePassword] = useState<boolean>(true);

  useEffect(() => {
    setError(authError);

    if (authUser) {
      navigation.navigate('AuthStack', {
        screen: 'Home',
      });
    }

    return () => {
      if (error) {
        clearError();
      }
    };
  }, [authError, error, clearError, authUser, navigation]);

  const toggleShowPassword = () => setSecurePassword(!securePassword);

  const loginUser = () => {
    login({ username, password });
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView behavior="padding">
        <View>
          <Text style={styles.title}>Welcome Back</Text>
        </View>

        {error ? (
          <View>
            <Text style={styles.error}>{error.message}</Text>
          </View>
        ) : null}

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

          <Button variant={Variant.secondary} onPress={loginUser}>
            Login
          </Button>
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
  error: {
    fontSize: 14,
    color: colors.white,
    backgroundColor: colors.lightOrange,
    borderRadius: 8,
    padding: 4,
    textAlign: 'center',
  },
});
