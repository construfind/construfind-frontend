import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, KeyboardAvoidingView, LogBox  } from "react-native";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from "react-native-flash-message";

import Routes from './routes';
import { store, persistor } from './store';

const construfindTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(251, 251, 251)',
  },
};

LogBox.ignoreAllLogs();

const App = () => {
  return (    
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={construfindTheme}>        
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
            <StatusBar backgroundColor={'rgb(251, 251, 251)'} barStyle={'dark-content'}/>
            <Routes />
            <FlashMessage position="top" />     
          </KeyboardAvoidingView>   
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
