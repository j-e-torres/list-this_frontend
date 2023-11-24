import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import { Login } from '../screens/login/login.screen';
import { Signup } from '../screens/signup/signup.screen';
import { Root } from '../screens/root/root.screen';
import { Home } from '../screens/home/home.screen';
import { ViewLists } from '../screens/view-lists/view-lists.screen';
import { ViewList } from '../screens/view-list/view-list.screen';
import { TestView } from '../screens/__test/test.component';

import { CreateListModal } from '../modals/create-list-modal/create-list.modal';
import { CreateTaskModal } from '../modals/create-task-modal/create-task.modal';
import { ViewListUsersModal } from '../modals/view-list-users-modal/view-list-users.modal';

import { getStoredToken } from '../../utils/async-storage';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../utils/redux-injectors.ts';

import { NavigationTypes } from '../../types';
import { colors } from '../../styles';

import { sliceKey, reducer } from '../../stores/auth/slice/auth.slice';
import { userTokenLoginSaga } from '../../stores/auth/sagas/auth.saga';
import { AuthFacadeService } from '../../stores/auth/facades/auth.facade';

const RootStack =
  createNativeStackNavigator<NavigationTypes.RootStackParamList>();

const UnauthStack =
  createNativeStackNavigator<NavigationTypes.UnauthorizedStackParams>();

const ModalStack =
  createNativeStackNavigator<NavigationTypes.ModalStackParams>();

const AuthStack = createNativeStackNavigator<NavigationTypes.AuthStackParams>();

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

const AuthScreenStack = () => {
  return (
    <AuthStack.Navigator initialRouteName="Home">
      <AuthStack.Group>
        <AuthStack.Screen name="Home" component={Home} />
        <AuthStack.Screen name="ViewLists" component={ViewLists} />
        <AuthStack.Screen name="ViewList" component={ViewList} />
        <AuthStack.Screen name="TestView" component={TestView} />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

const ModalScreenStack = () => {
  return (
    <ModalStack.Navigator screenOptions={{ presentation: 'modal' }}>
      <ModalStack.Group>
        <ModalStack.Screen name="CreateListModal" component={CreateListModal} />
        <ModalStack.Screen name="CreateTaskModal" component={CreateTaskModal} />
        <ModalStack.Screen name="ViewListUsersModal" component={ViewListUsersModal} />
      </ModalStack.Group>
    </ModalStack.Navigator>
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
        <RootStack.Screen name="Modals" component={ModalScreenStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
