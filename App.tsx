// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * Generated with the TypeScript template
//  * https://github.com/react-native-community/react-native-template-typescript
//  *
//  * @format
//  */

import React from 'react';
import { Provider } from 'react-redux';

import { configureStoreApp } from './src/stores/reducers/configureStore';
import Navigation from './src/app/navigation';

const store = configureStoreApp();

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
