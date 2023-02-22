import React, { useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Entypo';
import { colors } from '../../../styles';
import { ScreenWrapper } from '../../components/screen-wrapper/screen-wrapper';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors.ts';
import { sliceKey, reducer } from '../../../stores/list/slice/list.slice';
import { fetchListSaga } from '../../../stores/list/sagas/list.saga';

import { ListFacadeService } from '../../../stores/list/facades/list.facade';
import { AuthFacadeService } from '../../../stores/auth/facades/auth.facade';
import { getStoredToken } from '../../../utils/async-storage';

import { ListTypes, NavigationTypes } from '../../../types';

import { ViewListHeader } from './components/view-list-header/view-list-header.component';
import { ViewTasks } from './components/view-tasks/view-tasks.component';
import { ViewListFooter } from './components/view-list-footer/view-list-footer.component';

export const ViewList: React.FC<
  NativeStackScreenProps<NavigationTypes.AuthStackParams, 'ViewList'>
> = (props) => {
  const { listId } = props.route.params;
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: fetchListSaga });

  const { fetchList, sortedTasks } = ListFacadeService();
  // const { authUser } = AuthFacadeService();
  const fetchUserList = useCallback(async () => {
    const payload: ListTypes.FetchListPayload = {
      listId,
      token: await getStoredToken(),
    };
    fetchList(payload);
  }, [listId, fetchList]);

  useEffect(() => {
    fetchUserList();
  }, []);

  // const modalNavigation =
  //   useNavigation<
  //     NativeStackNavigationProp<NavigationTypes.RootStackParamList>
  //   >();

  return (
    <ScreenWrapper>
      <View style={{ flex: 4 }}>
        <View style={{ flex: 1 }}>
          <ViewListHeader />
        </View>

        <View style={{ flex: 3 }}>
          <ViewTasks sortedTasks={sortedTasks} />
        </View>
      </View>

      <ViewListFooter />
    </ScreenWrapper>
  );
};
