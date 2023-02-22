import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { colors } from '../../../../../styles';

export const ViewListFooter = (props) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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
