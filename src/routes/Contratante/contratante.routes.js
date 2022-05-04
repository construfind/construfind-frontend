import React from 'react';
import Inicio from '../../pages/Contratante/Inicio';
import {createStackNavigator} from '@react-navigation/stack';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const ContratanteStack = createStackNavigator();

const ContratanteRoutes = () => {
  return (
    <ContratanteStack.Navigator>
      <ContratanteStack.Screen name="Login" component={Inicio} />
    </ContratanteStack.Navigator>
  );
};

export default ContratanteRoutes;
