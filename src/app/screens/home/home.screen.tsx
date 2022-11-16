import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useInjectReducer } from '../../../utils/redux-injectors.ts';

import { sliceKey, reducer } from '../../../stores/auth/slice/auth.slice';
import { AuthFacadeService } from '../../../stores/auth/facades/auth.facade';

import { colors } from '../../../styles';
import { ScreenWrapper } from '../../components/screen-wrapper/screen-wrapper';
import { Button } from '../../components/button/button';
import { Variant, NavigationTypes } from '../../../types';

export const Home: React.FC = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });

  const modalNavigation =
    useNavigation<
      NativeStackNavigationProp<NavigationTypes.RootStackParamList, 'Modals'>
    >();

  const { authUser } = AuthFacadeService();

  return (
    <ScreenWrapper>
      <View>
        <Text style={styles.title}>Welcome back {authUser?.displayName}</Text>
      </View>

      <View style={styles.buttonView}>
        <Button
          onPress={() =>
            modalNavigation.navigate('Modals', {
              screen: 'CreateListModal',
            })
          }
          width={300}
          variant={Variant.primary}>
          <Text>Start a List</Text>
        </Button>

        <Button
          onPress={() =>
            modalNavigation.navigate('AuthStack', {
              screen: 'ViewLists',
            })
          }
          width={300}
          variant={Variant.secondary}>
          <Text>View your lists</Text>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.lightBlack,
  },
  buttonView: {
    justifyContent: 'space-between',
    marginTop: 36,
    alignItems: 'center',
    height: 150,
  },
});
