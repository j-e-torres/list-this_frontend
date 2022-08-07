import { NavigatorScreenParams } from '@react-navigation/native';

// export type RootStackParamList = {
//   Root: undefined;
//   Login: undefined;
//   Signup: undefined;
//   Home: undefined;
// }

export type RootStackParamList = {
  UnauthStack: NavigatorScreenParams<UnauthorizedStackParams>;
  AuthStack: NavigatorScreenParams<AuthStackParams>;
};

export type UnauthorizedStackParams = {
  Root: undefined;
  Login: undefined;
  Signup: undefined;
};

export type AuthStackParams = {
  Home: undefined;
};
