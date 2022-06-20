import React from 'react';
import styled from 'styled-components/native';
import {StyleSheet, View, Text} from 'react-native';

import { COLORS, FONTS } from '../../assets/constants';
import load from '../../assets/images/Loading.gif';
import { IconWithBadge } from './chat';

const WelcomeHeader = ( props ) => {
  return (
    <Container>
      <ImagemPerfil source={load} />
      <Col>
        <TextoUsuario>  Bem vindo, </TextoUsuario>
        <TextoUsuario>  {props.nomeUsuario}</TextoUsuario>
      </Col>
      <ChatButton>      
        <IconWithBadge badgeCount={3} name='chatbubble-ellipses' size={33} color={COLORS.black} />
      </ChatButton>
    </Container>
  )
}

const Container = styled.View`
  flex-direction: row;
  width: 90%;
  height: 50;
  align-items: center;
  margin: 5%;
`;

const ChatButton = styled.TouchableOpacity`
  border-radius: 20;
  width: 65;
  height: 65;
  right: 0;
  position: absolute;
  background-color: ${COLORS.primary};
  align-items: center;
  justify-content: center;
`;

const Row = styled.View`
  flex-direction: row;
`;

const Col = styled.View`
  flex-direction: column;
`;

const ImagemPerfil = styled.Image`
  width: 60;
  height: 60;
  border-radius: 1000;
`;

const TextoUsuario = styled.Text`
  align-self: flex-start;
  color: ${COLORS.black};
  font-family: ${FONTS.semiBold};
  font-size: 15;
`;

export default WelcomeHeader;
