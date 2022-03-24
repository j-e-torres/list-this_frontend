import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../screens/login/login.screen';
import { Signup } from '../screens/signup/signup.screen';

const Stack = createNativeStackNavigator();

export default class Navigation extends Component {
  // if (state.isLoading) {
  //   // We haven't finished checking for the token yet
  //   return <SplashScreen />;
  // }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Signup" component={Signup} />

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
        </Stack.Navigator>
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
