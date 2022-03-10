import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (e) {
    // saving error
    throw e;
  }
};

export const getStoredToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (e) {
    // error reading value
    throw e;
  }
};
