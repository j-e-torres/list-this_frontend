import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import { Login } from '../screens/login/login.screen';
import { Signup } from '../screens/signup/signup.screen';
import { Root } from '../screens/root/root.screen';
import { Home } from '../screens/home/home.screen';

import { getStoredToken } from '../../utils/async-storage';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../utils/redux-injectors.ts';

import {
  RootStackParamList,
  UnauthorizedStackParams,
  AuthStackParams,
} from '../../types/navigation';
import { colors } from '../../styles';

import { sliceKey, reducer } from '../../stores/auth/slice/auth.slice';
import { userTokenLoginSaga } from '../../stores/auth/sagas/auth.saga';
import { AuthFacadeService } from '../../stores/auth/facades/auth.facade';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const UnauthStack = createNativeStackNavigator<UnauthorizedStackParams>();

const UnauthScreenStack = () => {
  return (
    <UnauthStack.Navigator
      initialRouteName="Root"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.darkOrange,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      <UnauthStack.Group>
        <UnauthStack.Screen
          options={{ headerShown: false }}
          name="Root"
          component={Root}
        />
        <UnauthStack.Screen name="Login" component={Login} />
        <UnauthStack.Screen name="Signup" component={Signup} />
      </UnauthStack.Group>
    </UnauthStack.Navigator>
  );
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthScreenStack = () => {
  return (
    <AuthStack.Navigator initialRouteName="Home">
      <AuthStack.Group>
        <AuthStack.Screen name="Home" component={Home} />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

const Navigation: React.FC = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: userTokenLoginSaga });

  const { authLoading, loginToken, authUser } = AuthFacadeService();

  useEffect(() => {
    async function fetchStoredToken() {
      const token = await getStoredToken();

      if (token) {
        loginToken(`Bearer ${token}`);
      }
    }

    fetchStoredToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //call once

  if (authLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 24, color: 'white' }}>Loading</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="UnauthStack"
        screenOptions={{ headerShown: false }}>
        {authUser ? (
          <RootStack.Screen
            options={{ headerShown: false }}
            name="AuthStack"
            component={AuthScreenStack}
          />
        ) : (
          <RootStack.Screen
            options={{ headerShown: false }}
            name="UnauthStack"
            component={UnauthScreenStack}
          />
        )}

        {/* <Stack.Group>
            <Stack.Screen name="Root" component={Root} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Group> */}

        {/* {isLoggedIn ? (
            // Screens for logged in users
            <Stack.Group>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Profile" component={Profile} />
            </Stack.Group>
          ) : (
            // Auth screens
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Group>
          )}
          Common modal screens
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen name="Invite" component={Invite} />
          </Stack.Group> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

// {/* <Stack.Navigator>
// {isLoggedIn ? (
//   // Screens for logged in users
//   <Stack.Group>
//     <Stack.Screen name="Home" component={Home} />
//     <Stack.Screen name="Profile" component={Profile} />
//   </Stack.Group>
// ) : (
//   // Auth screens
//   <Stack.Group screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="SignIn" component={SignIn} />
//     <Stack.Screen name="SignUp" component={SignUp} />
//   </Stack.Group>
// )}
// {/* Common modal screens */}
// <Stack.Group screenOptions={{ presentation: 'modal' }}>
//   <Stack.Screen name="Help" component={Help} />
//   <Stack.Screen name="Invite" component={Invite} />
// </Stack.Group>
// </Stack.Navigator> */}
export default Navigation;
