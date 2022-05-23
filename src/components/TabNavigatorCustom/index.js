import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { HeaderLogo } from '../../components';

const Tab = createBottomTabNavigator();

const TabNavigatorCustom = (props) => {
  return (
    <Tab.Navigator 
    screenOptions={{
      headerShown: true,
      headerStyle:{
        borderBottomColor: '#C7C7C7',
        borderBottomWidth: 1,
        height: 45,
        backgroundColor: 'transparent',
        shadowColor: 'transparent'
      },
      headerTitle: (props) =>{
        return <HeaderLogo/>
      },
      tabBarShowLabel: false,
      tabBarStyle: { 
        backgroundColor: '#ffffff',
        height: 65,
        bottom: 0,
        position: 'absolute',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35
      },
    }}    
    {...props}>

      {props.children}

    </Tab.Navigator>
  );
}

export default TabNavigatorCustom;
