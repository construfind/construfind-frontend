import styled from 'styled-components';
import React from 'react';

const ButtonAuth = (props) => {
  return (
    <StyledButton {...props}>
      <StyledText>
        {props.text}
      </StyledText>
      {props.children}
    </StyledButton>
  );
}

const StyledButton = styled.TouchableOpacity`
  background-color: #F0D23F;
  width: 100%;
  height: 50px;
  border-radius: 12px;
  margin-top: 10%;
  margin-bottom: 10%;
`;

const StyledText = styled.Text`
  color: #0C0C0C;
  margin: auto;
  font-family: 'Poppins-Medium';
  font-size: 16px;
`;

export default ButtonAuth;
