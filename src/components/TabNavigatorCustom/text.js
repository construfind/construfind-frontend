import React from 'react';
import styled from 'styled-components/native';

const TextStyled = (props) => {
  return <TextOption>{props.text}</TextOption>
};

const TextOption = styled.Text`
  align-self: center;
  font-size: 15;
  top: -10px;
`;

export default TextStyled;
