import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (e) {
    // saving error
    throw e;
  }
};

export const getStoredToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (e) {
    // error reading value
    throw e;
  }
};
