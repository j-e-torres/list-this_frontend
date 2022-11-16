import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  UnauthStack: NavigatorScreenParams<UnauthorizedStackParams>;
  AuthStack: NavigatorScreenParams<AuthStackParams>;
  Modals: NavigatorScreenParams<ModalStackParams>;
};

export type UnauthorizedStackParams = {
  Root: undefined;
  Login: undefined;
  Signup: undefined;
};

export type AuthStackParams = {
  Home: undefined;
  ViewLists: undefined;
};

export type ModalStackParams = {
  CreateListModal: undefined;
};
