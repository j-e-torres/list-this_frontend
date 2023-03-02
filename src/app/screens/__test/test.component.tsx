import React, { useEffect, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { sliceKey, reducer } from '../../../stores/list/slice/list.slice';
import { fetchListSaga } from '../../../stores/list/sagas/list.saga';
import { ListFacadeService } from '../../../stores/list/facades/list.facade';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors.ts';
import { getStoredToken } from '../../../utils/async-storage';

const WOOOOOOOO = {
  listId: 'adf61b30-6625-462a-94e7-5e4e5c73aae4',
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijk2NWU4NDA1LTllYjQtNDBiMi1hOTllLWM4ZWY2ZGQ2YzdmNCJ9.ng-OAmOa8-ZWVlty_TMpLv7pHLUsmK2rfV5oKumkBFg',
};

export const TestView = (props) => {
  const { listId } = props.route.params;

  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: fetchListSaga });

  const { fetchList, sortedTasks, list } = ListFacadeService();
  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = useCallback(async () => {
    const payload = {
      listId,
      token: await getStoredToken(),
    };
    // const payload = {
    //   listId: WOOOOOOOO.listId,
    //   token: WOOOOOOOO.token,
    // };
    fetchList(payload);
    console.log('WOOOOOOOO', payload);
  }, [fetchList]);

  return (
    <View>
      <Text>Wow</Text>
    </View>
  );
};
