import React from 'react';
import { StatusBar } from "react-native";

import Apresentacao from '../pages/Apresentacao';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import CadastroEndereco from '../pages/Cadastro/address';

import * as stack from '@react-navigation/stack';

const AuthStack = stack.createStackNavigator();

const AuthRoutes = () => {
  return (
    <AuthStack.Navigator id="AuthRoutes" initialRouteName={"Apresentacao"} screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Apresentacao" component={Apresentacao}/>
      <AuthStack.Screen name="Login" component={Login}/>      
      <AuthStack.Screen name="Cadastro" component={Cadastro}/>
      <AuthStack.Screen name="CadastroEndereco" component={CadastroEndereco}/>
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
