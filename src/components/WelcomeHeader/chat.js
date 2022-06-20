import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { FONTS, COLORS } from '../../assets/constants';

export const IconWithBadge = ( props ) => {

  return (
    <Wrapper>
      <Icon name={props.name} size={props.size} color={props.color} />
      {props.badgeCount > 0 ? (
        <InnerContainer>
          <BadgeTxt>{props.badgeCount}</BadgeTxt>
        </InnerContainer>
      ) : null}
    </Wrapper>
  );
  
};

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.View`
  position: absolute;
  right: 8;
  top: 10;
  background-color: white;
  border-radius: 50;
  width: 25;
  height: 25;
  justify-content: center;
  align-items: center;
  border: 1.1px;
  border-color: ${COLORS.black};
`;

const BadgeTxt = styled.Text`
  color: black;
  font-size: 15;
  font-family: ${FONTS.bold};
`;
