import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Apresentacao from './src/screens/Apresentacao/Apresentacao';
import Login from './src/screens/Login/Login';
import Cadastro from './src/screens/Cadastro/Cadastro';

export default function App() {
  return <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Apresentacao"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Apresentacao" component={Apresentacao} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
    </Stack.Navigator>
  </NavigationContainer>
}