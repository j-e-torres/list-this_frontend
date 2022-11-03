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
  });

  const authNavigation =
    useNavigation<
      NativeStackNavigationProp<NavigationTypes.RootStackParamList, 'AuthStack'>
    >();

  return (
    /*
      - use state for listName, tasks, taskName
    */
    <ScreenWrapper>
      {/* <KeyboardAvoidingView behavior="padding"> */}
      <View style={{ flex: 1, marginBottom: 8 }}>
        <TextInput
          style={styles.input}
          // onChangeText={(listName) => this.setState({ listName })}
          placeholder="List name"
          autoFocus={true}
        />
      </View>

      <View style={{ flex: 3, marginBottom: 12 }}>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.item}>Example Task</Text>
          </View>
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
          <TextInput style={styles.input} placeholder="Item" />
        </View>

        <View style={{ flex: 1 }}>
          <Button variant={Variant.secondary}>Add</Button>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Button variant={Variant.primary}>Done with List</Button>
      </View>
      {/* </KeyboardAvoidingView> */}
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
});
