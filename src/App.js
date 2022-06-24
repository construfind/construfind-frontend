import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, LogBox, KeyboardAvoidingView } from "react-native";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from "react-native-flash-message";

import Routes from './routes';
import { store, persistor } from './store';

LogBox.ignoreLogs([
  "Expected style",
]);

const construfindTheme = {
  colors: {
    background: 'rgb(251, 251, 251)',
  },
};

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={construfindTheme}>
          <StatusBar backgroundColor={'rgb(251, 251, 251)'} barStyle={'dark-content'}/>
          <Routes />
          <FlashMessage position="top" />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
