import React, { useEffect, useState }  from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();

const FooterNavigator = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [option1Color, setOption1Color] = useState('#6A6A6A');
  const [option2Color, setOption2Color] = useState('#6A6A6A');
  const [option3Color, setOption3Color] = useState('#6A6A6A');
  const [option4Color, setOption4Color] = useState('#6A6A6A');

  useEffect(() => {

    if(route.name == props.navigate1){
      setOption1Color('#F0D22F');
      setOption2Color('#6A6A6A');
      setOption3Color('#6A6A6A');
      setOption4Color('#6A6A6A');
    }
    else if(route.name == props.navigate2){
      setOption1Color('#6A6A6A');
      setOption2Color('#F0D22F');
      setOption3Color('#6A6A6A');
      setOption4Color('#6A6A6A');
    }
    else if(route.name == props.navigate3){
      setOption1Color('#6A6A6A');
      setOption2Color('#6A6A6A');
      setOption3Color('#F0D22F');
      setOption4Color('#6A6A6A');
    }
    else if(route.name == props.navigate4){
      setOption1Color('#6A6A6A');
      setOption2Color('#6A6A6A');
      setOption3Color('#6A6A6A');
      setOption4Color('#F0D22F');
    }
  }, [option1Color, option2Color, option3Color, option4Color]);    

  return (
    <Container>
      <Option onPress={() => {navigation.navigate(props.navigate1); setOption1Color('white')}}>
        <IconStyled name={props.icon1} size={35} color={option1Color}  />
        <TextOption>{props.text1}</TextOption>
      </Option>

      <Option onPress={() => {navigation.navigate(props.navigate2); setOption2Color('white')}}>
        <IconStyled name={props.icon2} size={35} color={option2Color}  />
        <TextOption>{props.text2}</TextOption>
      </Option>

      <Option onPress={() => {navigation.navigate(props.navigate3); setOption3Color('white')}}>
        <IconStyled name={props.icon3} size={35} color={option3Color}  />
        <TextOption>{props.text3}</TextOption>
      </Option>

      <Option onPress={() => {navigation.navigate(props.navigate4); setOption4Color('white')}}>
        <IconStyled name={props.icon4} size={35} color={option4Color}  />
        <TextOption>{props.text4}</TextOption>
      </Option>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  background-color: white;
  width: 100%;
  height: 75px;
  bottom: 0%;
  position: absolute;
  box-shadow: 1000px 500px 500px black;  
`;

const Option = styled.TouchableOpacity`
  flex: 1;
  width: 50%;
  box-shadow: 1000px 500px 500px black;
`;

const IconStyled = styled(Icon)`
  margin: auto;
  box-shadow: 1000px 500px 500px black;
`;

const TextOption = styled.Text`
  align-self: center;
  top: -10px;
  box-shadow: 1000px 500px 500px black;
`;

export default FooterNavigator;
