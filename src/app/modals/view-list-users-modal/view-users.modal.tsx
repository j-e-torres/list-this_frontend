import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { View, TextInput, Text, StyleSheet, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors.ts/index.js';

import { ScreenWrapper } from '../../components/screen-wrapper/screen-wrapper.js';

import { sliceKey, reducer } from '../../../stores/list/slice/list.slice.js';
import { createListSaga } from '../../../stores/list/sagas/list.saga.js';
import { ListFacadeService } from '../../../stores/list/facades/list.facade.js';
import { AuthFacadeService } from '../../../stores/auth/facades/auth.facade.js';

import { Button } from '../../components/button/button.js';
import { colors } from '../../../styles/index.js';
import { getStoredToken } from '../../../utils/async-storage/index.js';

import {
  CreateListModalState,
  Variant,
  NavigationTypes,
  ListTypes,
} from '../../../types/index.js';

export const ViewListUsersModal: React.FC = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: createListSaga });

  const { listUsers } =
    ListFacadeService();
  const { authUser } = AuthFacadeService();

  return (
    <ScreenWrapper>

    </ScreenWrapper>

  )
}