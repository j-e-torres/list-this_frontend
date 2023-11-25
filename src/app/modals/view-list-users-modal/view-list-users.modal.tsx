import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import { View, TextInput, Text, StyleSheet, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors.ts';

import { ScreenWrapper } from '../../components/screen-wrapper/screen-wrapper';

import { sliceKey, reducer } from '../../../stores/list/slice/list.slice';
import { fetchListUsersSaga } from '../../../stores/list/sagas/list.saga';
import { ListFacadeService } from '../../../stores/list/facades/list.facade';
import { AuthFacadeService } from '../../../stores/auth/facades/auth.facade';

import { Button } from '../../components/button/button';
import { colors } from '../../../styles';
import { getStoredToken } from '../../../utils/async-storage';

import {
  CreateListModalState,
  Variant,
  NavigationTypes,
  ListTypes,
} from '../../../types';

export const ViewListUsersModal: React.FC<NativeStackScreenProps<NavigationTypes.ModalStackParams, 'ViewListUsersModal'>> = (props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: fetchListUsersSaga });

  const { listUsers, fetchListUsers, listLoading } = ListFacadeService();

  useEffect(() => {
    getListUsers();
  }, []);

  const getListUsers = async () => {
    const payload: ListTypes.FetchListPayload = {
      listId: props.route.params.listId,
      token: await getStoredToken(),
    };
    fetchListUsers(payload);
  };

  if (listLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScreenWrapper>
      <ScrollView >
        <View>
          {listUsers?.map((user, idx) => {
            return <Text style={styles.displayName} key={idx}>{user.displayName}</Text>;
          })}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  displayName: {
    fontSize: 30,
    color: colors.lightBlack,
    marginBottom: 12,
  },
});
