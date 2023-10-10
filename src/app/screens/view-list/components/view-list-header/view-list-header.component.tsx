import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { colors } from '../../../../../styles';

import { ButtonIcon } from '../../../../components/button-icon/button-icon';
interface ViewListHeaderProps {
  fetchUserList: () => Promise<void>;
}

export const ViewListHeader: React.FC<ViewListHeaderProps> = (props) => {
  return (
    <View style={styles.iconHeader}>
      <ButtonIcon
        iconName="ccw"
        iconSize={40}
        color={colors.lightBlack}
        buttonText="Refresh"
        onPressFunction={() => props.fetchUserList()}
      />

      <ButtonIcon
        iconName="add-to-list"
        iconSize={40}
        color={colors.lightBlack}
        buttonText="Add task"
        onPressFunction={() => console.log('Add task')}
      // onPress={() =>
      //   modalNavigation.navigate('Modals', {
      //     screen: 'CreateTaskModal',
      //     params: { id: list.id },
      //   })
      // }
      />

      {/* {userLogin.username === listOwner && (
            <ButtonIcon
              iconName="add-to-list"
              iconSize={40}
              color={colors.lightBlack}
              buttonText="Add User"
              onPressFunction={() => console.log('Add task')}
              onPress={() =>
                navigation.navigate('ListAddUserModal', {
                  listId: id,
                  userId: userLogin.id,
                  users: users,
                })
              }
            />
        )} */}

      <ButtonIcon
        iconName="users"
        iconSize={40}
        color={colors.lightBlack}
        buttonText="View users"
        onPressFunction={() => console.log('View Users')}
      // onPress={() => navigation.navigate('ViewUsersModal', { id })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconHeader: {
    borderBottomColor: colors.lightBlack,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
