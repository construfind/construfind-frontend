import React from 'react';
import { LogBox, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Perfil from '../../pages/Perfil';
import Inicio from '../../pages/Prestador/Inicio';
import { TabNavigatorCustom, StyledIcon, StyledText } from '../../components';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Tab = createBottomTabNavigator();

const PrestadorRoutes = () => {
  return (
    <TabNavigatorCustom initialRouteName={"Inicio"}>

      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{
          tabBarIcon: ({focused}) =>{
            return (
              <View style={{flex: 1}}>

                <StyledIcon icon='home' size={35} focused={focused} />
                <StyledText text='Inicio' />

              </View>
            );
          }
        }} />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({focused}) =>{
            return (
              <View style={{flex: 1}}>

                <StyledIcon icon='account' size={35} focused={focused} />
                <StyledText text='Perfil' />

              </View>
            );
          }
        }} />

    </TabNavigatorCustom>
  );
};

export default PrestadorRoutes;
