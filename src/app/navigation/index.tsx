import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../screens/login/login.screen';
import { Signup } from '../screens/signup/signup.screen';
import { Root } from '../screens/root/root.screen';

import { getStoredToken } from '../../utils/async-storage';

import {
  RootStackParamList,
  UnauthorizedStackParams,
  AuthStackParams,
} from '../../types/navigation';
import { colors } from '../../styles';

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

// const

const AuthStack = createNativeStackNavigator<AuthStackParams>();

// const AuthScreenStack = () => {
//   <AuthStack.Navigator>
//     <AuthStack.Group>
//       <AuthStack.Screen name="Home" component={Home} />
//     </AuthStack.Group>
//   </AuthStack.Navigator>;
// };

export default class Navigation extends Component {
  // if (state.isLoading) {
  //   // We haven't finished checking for the token yet
  //   return <SplashScreen />;
  // }

  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="UnauthStack"
          screenOptions={{ headerShown: false }}>
          <RootStack.Screen
            options={{ headerShown: false }}
            name="UnauthStack"
            component={UnauthScreenStack}
          />

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
  }
}

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
