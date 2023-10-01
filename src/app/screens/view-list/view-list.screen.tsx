import React, { useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { ScreenWrapper } from '../../components/screen-wrapper/screen-wrapper';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors.ts';

import {
  sliceKey as listSliceKey,
  reducer as listReducer,
} from '../../../stores/list/slice/list.slice';
import { fetchListSaga } from '../../../stores/list/sagas/list.saga';
import { ListFacadeService } from '../../../stores/list/facades/list.facade';

import {
  sliceKey as taskSliceKey,
  reducer as taskReducer,
} from '../../../stores/task/slice/task.slice';
import { completeTaskSaga, deleteTaskSaga, rootTaskSaga } from '../../../stores/task/sagas/task.saga';
import { TaskFacadeService } from '../../../stores/task/facades/task.facade';

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

  useInjectReducer({ key: listSliceKey, reducer: listReducer });
  useInjectSaga({ key: listSliceKey, saga: fetchListSaga });
  const { fetchList, list, clearList } = ListFacadeService();

  useInjectReducer({ key: taskSliceKey, reducer: taskReducer });
  // useInjectSaga({ key: taskSliceKey, saga: completeTaskSaga });
  // useInjectSaga({ key: taskSliceKey, saga: deleteTaskSaga });
  useInjectSaga({ key: taskSliceKey, saga: rootTaskSaga });
  const { task } = TaskFacadeService();

  const fetchUserList = async () => {
    const payload: ListTypes.FetchListPayload = {
      listId,
      token: await getStoredToken(),
    };
    fetchList(payload);
  };

  // NOTE(juan): whenever task from the redux selector changes, it will fetch the User's list
  useEffect(() => {
    fetchUserList();

    return () => {
      clearList();
    };
  }, [task]);

  // const { authUser } = AuthFacadeService();
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
          <ViewTasks />
        </View>
      </View>

      <ViewListFooter />
    </ScreenWrapper>
  );
};
