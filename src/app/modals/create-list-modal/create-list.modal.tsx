import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { View, TextInput, Text, StyleSheet, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors.ts';

import { ScreenWrapper } from '../../components/screen-wrapper/screen-wrapper';

import { sliceKey, reducer } from '../../../stores/list/slice/list.slice';
import { createListSaga } from '../../../stores/list/sagas/list.saga';
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

export const CreateListModal: React.FC = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: createListSaga });

  const { createListDispatch, list, listLoading, listError, clearList } =
    ListFacadeService();
  const { authUser } = AuthFacadeService();

  const [listState, setListState] = useState<CreateListModalState>({
    listName: '',
    taskName: '',
    tasks: [],
    error: '',
    success: '',
  });

  const authNavigation =
    useNavigation<
      NativeStackNavigationProp<NavigationTypes.RootStackParamList, 'AuthStack'>
    >();

  useEffect(() => {
    if (list) {
      setListState({ ...listState, success: 'Successfully created.' });
      setTimeout(() => {
        authNavigation.navigate('AuthStack', {
          screen: 'Home',
        });
      }, 750);
    }

    return () => {
      if (list) {
        clearList();
      }
    };
  }, [list, authNavigation, clearList, listState]);

  const addToList = () => {
    const { taskName, tasks } = listState;

    if (taskName.length < 1) {
      setListState({ ...listState, error: "Can't add empty item" });
    } else {
      setListState({
        ...listState,
        tasks: [...tasks, { taskName }],
        taskName: '',
        error: '',
      });
    }
  };

  const createList = async () => {
    const { listName, tasks } = listState;
    const buildPayload: ListTypes.CreateListPayload = {
      list: {
        listName,
        listOwner: authUser?.username,
      },
      tasks,
      token: await getStoredToken(),
    };

    createListDispatch(buildPayload);
  };

  return (
    <ScreenWrapper>
      {/* <KeyboardAvoidingView behavior="padding"> */}
      {/* <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1 }}> */}

      {listState.success.length > 0 && (
        <View>
          <Text style={styles.success}>{listState.success}</Text>
        </View>
      )}

      {listState.error.length > 0 && (
        <View>
          <Text style={styles.error}>{listState.error}</Text>
        </View>
      )}

      <View
        style={{
          flex: 1,
          marginBottom: 8,
          position: 'relative',
        }}>
        <Text style={styles.required}>*</Text>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          onChangeText={(listName) => setListState({ ...listState, listName })}
          placeholder="List name"
          autoFocus={true}
          value={listState.listName}
        />
      </View>

      <View style={{ flex: 3, marginBottom: 12 }}>
        <ScrollView>
          {listState.tasks.map((task, idx) => {
            return (
              <View key={idx} style={styles.itemLine}>
                <Text style={styles.item}>{task.taskName}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 12,
        }}>
        <View style={{ flex: 2 }}>
          <TextInput
            value={listState.taskName}
            style={styles.input}
            placeholder="Item"
            onChangeText={(task) =>
              setListState({ ...listState, taskName: task })
            }
          />
        </View>

        <View style={{ flex: 1 }}>
          <Button onPress={() => addToList()} variant={Variant.secondary}>
            Add
          </Button>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Button onPress={createList} variant={Variant.primary}>
          Create List
        </Button>
      </View>
      {/* </KeyboardAvoidingView> */}
      {/* </ScrollView> */}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginVertical: 10,
    padding: 4,
    fontSize: 25,
    borderBottomWidth: 1,
    borderColor: colors.lightOrange,
    paddingLeft: 12,
  },
  itemLine: {
    paddingLeft: 5,
    paddingVertical: 5,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: colors.lightPink2,
    borderBottomColor: colors.lightGreyBlue2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    fontSize: 18,
    color: colors.lightBlack,
  },
  error: {
    padding: 4,
    color: colors.white,
    backgroundColor: colors.lightPink2,
    fontSize: 18,
    textAlign: 'center',
  },
  required: {
    top: 8,
    color: colors.darkOrange,
    position: 'absolute',
  },
  success: {
    padding: 4,
    color: colors.white,
    backgroundColor: colors.green,
    fontSize: 18,
    textAlign: 'center',
  },
});
