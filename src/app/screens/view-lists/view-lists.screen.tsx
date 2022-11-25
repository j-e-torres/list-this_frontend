import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Entypo';

import { colors } from '../../../styles';
import { ScreenWrapper } from '../../components/screen-wrapper/screen-wrapper';
import { NavigationTypes, ListTypes } from '../../../types';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors.ts';

import { sliceKey, reducer } from '../../../stores/list/slice/list.slice';
import { fetchListsSaga } from '../../../stores/list/sagas/list.saga';
import { ListFacadeService } from '../../../stores/list/facades/list.facade';
import { AuthFacadeService } from '../../../stores/auth/facades/auth.facade';
import { getStoredToken } from '../../../utils/async-storage';

// move to utils
export const stickyNotesTiltDegrees = () => {
  const randomInt = Math.floor(Math.random() * Math.floor(14)) - 6;

  // return `${randomInt}deg`;
  return [{ rotate: `${randomInt}deg` }];
};

export const ViewLists: React.FC = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: fetchListsSaga });

  const { fetchLists, lists } = ListFacadeService();
  const { authUser } = AuthFacadeService();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<NavigationTypes.RootStackParamList, 'AuthStack'>
    >();

  useEffect(() => {
    fetchUserLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  const fetchUserLists = async () => {
    if (authUser) {
      const payload: ListTypes.FetchListsPayload = {
        userId: authUser.id,
        token: await getStoredToken(),
      };
      fetchLists(payload);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.iconHeader}>
        <TouchableOpacity
          onPress={fetchUserLists}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="ccw" size={40} color={colors.lightBlack} />
          <Text style={{ color: colors.lightBlack }}>Refresh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Modals', {
              screen: 'CreateListModal',
            })
          }
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="add-to-list" size={40} color={colors.lightBlack} />
          <Text style={{ color: colors.lightBlack }}>New List</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.panelsContainerClipBoard}>
        <View style={{ flex: 1 }}>
          <Text allowFontScaling style={styles.clipBoardTitle}>
            Here are your lists.
          </Text>
        </View>

        <View style={{ flex: 6 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {lists && lists.length > 0 && (
              <View style={styles.panelsContainerLayout}>
                {lists.map((list, idx) => {
                  return (
                    <TouchableOpacity
                      // onPress={() => navigation.navigate('ListItems', list)}
                      style={panelStyle().panel}
                      key={idx}>
                      <Text style={styles.title} numberOfLines={1}>
                        {list.listName}
                      </Text>

                      {list.tasks.length > 0 ? (
                        <View>
                          <Text style={styles.listItems}>
                            {list.tasks[0] ? list.tasks[0].taskName : ''}
                          </Text>

                          <Text style={styles.listItems}>
                            {list.tasks[1] ? list.tasks[1].taskName : ''}
                          </Text>

                          <Text style={styles.listItemsEnd}>
                            {list.tasks.length - 2 > 0
                              ? 'list continued...'
                              : ''}
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Text style={styles.listItems}>No Tasks</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const panelStyle = () =>
  StyleSheet.create({
    panel: {
      // flex: 1,
      backgroundColor: colors.white,
      width: '49%',
      paddingLeft: 15,
      transform: stickyNotesTiltDegrees(),
      // shadowOffset: {width: 100, height: 100},
      // shadowColor: '#000',
      // shadowOpacity: 0.8,
      // shadowRadius: 50,
      elevation: 20,
    },
  });

const styles = StyleSheet.create({
  iconHeader: {
    borderBottomColor: colors.lightBlack,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    flex: 1,
  },
  panelContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 8,
  },
  panelsContainerClipBoard: {
    flex: 7,
    borderColor: colors.black,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: colors.lightBrown,
    padding: 8,
    overflow: 'hidden',
  },
  panelsContainerLayout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: 10,
  },
  clipBoardTitle: {
    fontSize: 25,
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
    color: colors.black,
    marginVertical: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title: {
    fontSize: 25,
    color: colors.lightOrange,
    fontWeight: 'bold',
    paddingLeft: 5,
    borderLeftColor: colors.lightPink,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGreyBlue,
  },
  // secondaryTitle: {
  //   paddingLeft: 5,
  //   ...typography.stickyNotesSecondaryTitle,
  //   ...borders.stickyNotesBorder,
  // },
  listItems: {
    paddingLeft: 5,
    fontSize: 14,
    color: colors.lightGrey,
    borderLeftColor: colors.lightPink,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGreyBlue,
  },
  listItemsEnd: {
    paddingLeft: 5,
    fontSize: 12,
    color: colors.lightGrey,
    fontStyle: 'italic',
  },
});
