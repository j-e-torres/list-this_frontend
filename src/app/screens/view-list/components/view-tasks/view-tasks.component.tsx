import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import { colors } from '../../../../../styles';
import { TaskTypes } from '../../../../../types';

interface Props {
  sortedTasks: TaskTypes.Task[] | null | undefined;
}

export const ViewTasks = (props: Props) => {
  const { sortedTasks } = props;

  if (!sortedTasks) {
    return <Text style={styles.noTasks}>No tasks created yet</Text>;
  }

  return (
    <ScrollView>
      {sortedTasks?.map((task, idx) => {
        return (
          <View key={idx} style={styles.itemLine}>
            <Text style={completedTaskStyle(task.completed).task}>
              {task.taskName}
            </Text>

            {task.completed === true ? (
              <Text style={completedTaskStyle(task.completed).taskOwner} />
            ) : (
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => console.log('complete task')}
                  style={completedTaskStyle(task.completed).taskOwner}>
                  <Text>
                    <Icon name="circle" size={16} color={colors.lightBlack} />
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => console.log('delete task')}
                  style={completedTaskStyle(task.completed).taskOwner}>
                  <Text>
                    <Icon name="cross" size={20} color={colors.lightBlack} />
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
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
  itemLine: {
    paddingLeft: 5,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: colors.lightPink2,
    borderBottomColor: colors.lightGreyBlue2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  noTasks: {
    flex: 1,
    fontSize: 25,
    color: colors.lightGrey,
    textAlign: 'center',
  },
});
