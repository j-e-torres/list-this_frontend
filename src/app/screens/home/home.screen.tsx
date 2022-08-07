import React from 'react';

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export const Home: React.FC = () => {
  return (
    <View>
      <View>
        <Text>Welcome back username</Text>
      </View>

      <View>
        <TouchableOpacity>
          <Text>Start a List</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity>
          <Text>View your lists</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
