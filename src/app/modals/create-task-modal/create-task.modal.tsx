import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors.ts';

import { ScreenWrapper } from '../../components/screen-wrapper/screen-wrapper';
import { colors } from '../../../styles';
import { Button } from '../../components/button/button';

import { createListSaga } from '../../../stores/list/sagas/list.saga';
import { sliceKey, reducer } from '../../../stores/list/slice/list.slice';

import { ListFacadeService } from '../../../stores/list/facades/list.facade';
import { AuthFacadeService } from '../../../stores/auth/facades/auth.facade';
import { getStoredToken } from '../../../utils/async-storage';

import {
  NavigationTypes,
  CreateTaskModalState,
  Variant,
  ListTypes,
} from '../../../types';

export const CreateTaskModal: React.FC<
  NativeStackScreenProps<NavigationTypes.ModalStackParams, 'CreateTaskModal'>
> = (props) => {
  const { id } = props.route.params;

  const [taskModalState, setTaskModalState] = useState<CreateTaskModalState>({
    taskName: '',
    success: '',
    error: '',
    tasks: [],
  });

  const { updateListDispatch } = ListFacadeService();
  const { authUser } = AuthFacadeService();

  const { tasks, taskName, error, success } = taskModalState;

  const addToList = () => {
    setTaskModalState({ ...taskModalState, error: '' });

    if (taskName.length < 1) {
      setTaskModalState({ ...taskModalState, error: "Can't add empty task!" });
    } else {
      setTaskModalState({
        ...taskModalState,
        tasks: [...tasks, { taskName }],
        error: '',
      });
    }
  };

  const createTasks = async () => {
    const buildPayload: ListTypes.UpdateListPayload = {
      tasks,
      token: await getStoredToken(),
    };

    updateListDispatch(buildPayload);
    // return createTasks(id, tasks)
    //   .then(() => this.setState({success: 'Successfully added. '}))
    //   .then(() =>
    //     setTimeout(function() {
    //       navigation.goBack();
    //     }, 250),
    //   )
    //   .catch(e => {
    //     console.log('createTask, error', e);
    //     this.setState({error: e.response.data.errors});
    //   });
  };

  return (
    <ScreenWrapper>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1 }}>
        {success.length > 0 && (
          <View>
            <Text style={styles.success}>{success}</Text>
          </View>
        )}

        {/* {error.length > 0 && (
          <View>
            <Text style={styles.error}>{error}</Text>
          </View>
        )} */}

        <View style={{ flex: 1 }}>
          {tasks.length > 0 && (
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={{ flexGrow: 1 }}>
              {tasks.map((task, idx) => {
                return (
                  <View key={idx} style={styles.itemLine}>
                    <Text style={styles.item}>{task.taskName}</Text>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>

        <View
          style={{
            flex: 2,
            flexDirection: 'row',
          }}>
          <View style={{ flex: 2, position: 'relative' }}>
            <Text style={styles.required}>*</Text>
            <TextInput
              value={taskName}
              style={styles.input}
              onChangeText={(task) =>
                setTaskModalState({ ...taskModalState, taskName: task })
              }
              placeholder="Item"
              autoFocus={true}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Button
              onPress={addToList}
              variant={Variant.secondary}
              disabled={taskModalState.taskName.length < 1}>
              <Text style={styles.buttonText}>Add</Text>
            </Button>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Button
            disabled={taskModalState.tasks.length < 1}
            variant={Variant.primary}
            onPress={createTasks}>
            Add items to list
          </Button>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 4,
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
    // flex: 1,
  },
  item: {
    flex: 1,
    fontSize: 18,
    color: colors.lightBlack,
  },
  input: {
    height: 50,
    marginVertical: 10,
    padding: 4,
    fontSize: 25,
    borderBottomWidth: 1,
    borderColor: colors.lightOrange,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.lightBlack,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    borderColor: colors.darkOrange,
    borderWidth: 1,
    marginTop: 10,
  },
  buttonText: {
    color: colors.lightOrange,
    fontSize: 25,
  },
  error: {
    padding: 4,
    color: colors.lightGrey,
    fontSize: 18,
  },
  success: {
    padding: 4,
    color: colors.green,
    fontSize: 18,
    textAlign: 'center',
  },
  required: {
    top: 8,
    color: colors.darkOrange,
    position: 'absolute',
  },
});
