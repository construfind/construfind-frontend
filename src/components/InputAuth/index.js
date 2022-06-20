import styled from 'styled-components/native';
import React from 'react';
import { StyleSheet} from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputAuth = (props) => {
  return (
    <Input style={{height: props.height}}>
      <IconStyled name={props.icon} size={20} color="#6A6A6A"  />

      <MaskedStyle 
        underlineColorAndroid={'transparent'}
        {...props}/>

    </Input>
  );
}

const Input = styled.View`
  align-self: center;
  flex-direction: row;
  height: 54px;
  width: 100%;
  background-color: white;
  line-height: 20;
  margin-bottom: 10;
  border-radius: 12;
`;

const IconStyled = styled(Icon)`
  width: 10%;
  margin: auto 0% auto 5%;
`;

const MaskedStyle = styled(MaskInput)`
  font-family: 'Poppins';
  width: 80%;
  align-self: flex-start;
  text-align: left;
`;

export default InputAuth;
