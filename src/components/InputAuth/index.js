import styled from 'styled-components/native';
import React from 'react';
import { StyleSheet} from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputAuth = (props) => {
  return (
    <Input>
      <IconStyled name={props.icon} size={20} color="#6A6A6A"  />

      <MaskInput 
        underlineColorAndroid={'transparent'}
        style={MaskedStyle}
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

const MaskedStyle = StyleSheet.create({
  fontFamily: 'Poppins',
  width: '100%'
})

export default InputAuth;
