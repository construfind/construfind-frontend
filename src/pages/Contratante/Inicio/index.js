import React from 'react';
import {Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { FooterOptions, Container } from '../../../components';

const Inicio = () => {

  SplashScreen.hide();

  return (
    <Container>
      <Text>LOGADO</Text>
    </Container>
  )
};

export default Inicio;
