import React, { useEffect, useState } from 'react';
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
import { Button } from '../../components/button/button';
import { Variant, NavigationTypes } from '../../../types';

export const stickyNotesTiltDegrees = () => {
  const randomInt = Math.floor(Math.random() * Math.floor(14)) - 6;

  // return `${randomInt}deg`;
  return [{ rotate: `${randomInt}deg` }];
};

export const ViewLists: React.FC = () => {
  return (
    <ScreenWrapper>
      <View style={styles.iconHeader}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="ccw" size={40} color={colors.lightBlack} />
          <Text style={{ color: colors.lightBlack }}>Refresh</Text>
        </TouchableOpacity>
        <TouchableOpacity
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
            <View style={styles.panelsContainerLayout}>
              <TouchableOpacity
                // onPress={() => navigation.navigate('ListItems', list)}
                style={panelStyle().panel}
                // key={idx}
              >
                <Text style={styles.title} numberOfLines={1}>
                  LISTNAME
                </Text>

                <View>
                  <Text style={styles.listItems}>TASK NAME 1</Text>

                  <Text style={styles.listItems}>TASK NAME 2</Text>

                  <Text style={styles.listItemsEnd}>list continued...</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* {userLists.length > 0 && (
              <View style={styles.panelsContainerLayout}>
                {userLists.map((list, idx) => {
                  return (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ListItems', list)}
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
            )} */}
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
    // paddingBottom: '2%',
    marginBottom: '2%',
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
