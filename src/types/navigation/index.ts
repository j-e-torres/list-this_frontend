import { NavigatorScreenParams } from '@react-navigation/native';
import { ListTypes } from '..';

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
  ViewList: { listId: string };
  TestView: { listId: string };
};

export type ModalStackParams = {
  CreateListModal: undefined;
  CreateTaskModal: { id: string };
  ViewListUsersModal: { listId: string | undefined };
};
