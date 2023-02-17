import React, { useEffect, useCallback, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
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

import { ViewListHeader } from './components/view-list-header';

export const ViewList: React.FC<
  NativeStackScreenProps<NavigationTypes.AuthStackParams, 'ViewList'>
> = (props) => {
  const { listId } = props.route.params;
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: fetchListSaga });

  const { fetchList, list, sortedTasks } = ListFacadeService();
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

  const modalNavigation =
    useNavigation<
      NativeStackNavigationProp<NavigationTypes.RootStackParamList>
    >();

  return (
    <ScreenWrapper>
      <View style={{ flex: 4 }}>
        <View style={{ flex: 1 }}>
          <ViewListHeader />
        </View>

        <View style={{ flex: 3 }}>
          {sortedTasks && sortedTasks?.length > 0 ? (
            <ScrollView>
              {sortedTasks?.map((task, idx) => {
                return (
                  <View key={idx} style={styles.itemLine}>
                    <Text style={completedTaskStyle(task.completed).task}>
                      {task.taskName}
                    </Text>

                    {task.completed === true ? (
                      <Text
                        style={completedTaskStyle(task.completed).taskOwner}
                      />
                    ) : (
                      <View style={styles.iconContainer}>
                        <TouchableOpacity
                          // onPress={() => completeTask(task)}
                          style={completedTaskStyle(task.completed).taskOwner}>
                          <Text>
                            <Icon
                              name="circle"
                              size={16}
                              color={colors.lightBlack}
                            />
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          // onPress={() => _deleteTask(task)}
                          style={completedTaskStyle(task.completed).taskOwner}>
                          <Text>
                            <Icon
                              name="cross"
                              size={20}
                              color={colors.lightBlack}
                            />
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          ) : (
            <Text style={styles.noTasks}>No tasks created yet</Text>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerHeaderContainer}>
          <Text style={styles.footerHeader}>Notes</Text>

          {/* {notesEditable ? (
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={_updateListNotes}
                  style={{ flex: 1 }}>
                  <Icon name="check" size={25} color={colors.lightBlack} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleEditable} style={{ flex: 1 }}>
                  <Icon name="cross" size={25} color={colors.lightBlack} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleEditable}
                style={{ flex: 1, alignItems: 'center' }}>
                <Icon name="pencil" size={25} color={colors.lightBlack} />
              </TouchableOpacity>
            )} */}
          <TouchableOpacity
            // onPress={handleEditable}
            style={{ flex: 1, alignItems: 'center' }}>
            <Icon name="pencil" size={25} color={colors.lightBlack} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 3 }}>
          <TextInput
            // ref={editNotes}
            numberOfLines={1}
            style={styles.footerContent}
            // value={currentListNotes}
            // editable={notesEditable}
            // onChangeText={(text) => this.setState({ currentListNotes: text })}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const completedTaskStyle = (bool: boolean) =>
  StyleSheet.create({
    task: {
      flex: 3,
      fontSize: 18,
      color: bool === true ? colors.lightGrey : colors.lightBlack,
      textDecorationLine: bool === true ? 'line-through' : 'none',
    },
    taskOwner: {
      flex: 1,
      fontSize: 14,
      color: colors.lightGrey,
    },
  });

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  panelContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 12,
    // height: '200px',
    // justifyContent: 'space-between',
  },

  panelsContainerClipBoard: {
    flex: 1,
    borderColor: colors.black,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: colors.lightBrown,
    padding: 8,
    // marginHorizontal: -10,
  },

  panelsContainerLayout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    // marginVertical: 10,
  },
  itemLine: {
    paddingLeft: 5,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: colors.lightPink2,
    borderBottomColor: colors.lightGreyBlue2,
    flexDirection: 'row',
    alignItems: 'center',
    // alignContent: 'center',
    // justifyContent: 'space-between',
    // flex: 1,
    paddingVertical: 5,
  },

  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    borderColor: colors.darkOrange,
    borderWidth: 1,
  },

  buttonText: { color: colors.lightOrange, fontSize: 25 },

  noTasks: {
    flex: 1,
    fontSize: 25,
    color: colors.lightGrey,
    textAlign: 'center',
  },

  footer: {
    flex: 2,
    marginTop: 4,
    borderWidth: 1,
    borderColor: colors.lightBlack,
    borderRadius: 50,
    // flexWrap: 'wrap',
  },

  footerHeaderContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightOrange,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 8,
  },

  footerHeader: {
    flex: 1,
    color: colors.lightOrange,
    fontSize: 25,
    textAlign: 'center',
  },

  footerContent: {
    color: colors.lightBlack,
    fontSize: 28,
    textAlignVertical: 'top',
    paddingHorizontal: 20,
    flex: 1,
  },
});
