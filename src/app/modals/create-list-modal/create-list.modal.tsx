import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors.ts';

import { ScreenWrapper } from '../../components/screen-wrapper/screen-wrapper';

import { Button } from '../../components/button/button';
import { colors } from '../../../styles';

import { CreateListModalState, Variant, NavigationTypes } from '../../../types';

export const CreateListModal: React.FC = () => {
  const [listState, setListState] = useState<CreateListModalState>({
    listName: '',
    taskName: '',
    tasks: [],
    error: '',
  });

  const authNavigation =
    useNavigation<
      NativeStackNavigationProp<NavigationTypes.RootStackParamList, 'AuthStack'>
    >();

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

  return (
    /*
      - use state for listName, tasks, taskName
    */
    <ScreenWrapper>
      {/* <KeyboardAvoidingView behavior="padding"> */}
      {/* <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1 }}> */}
      {listState.error.length > 0 && (
        <View>
          <Text style={styles.error}>{listState.error}</Text>
        </View>
      )}

      <View style={{ flex: 1, marginBottom: 8 }}>
        <TextInput
          style={styles.input}
          // onChangeText={(listName) => this.setState({ listName })}
          placeholder="List name"
          autoFocus={true}
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
        <Button variant={Variant.primary}>Done with List</Button>
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
    color: colors.lightPink2,
    fontSize: 12,
    textAlign: 'center',
  },
});
