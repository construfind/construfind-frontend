import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import MaskInput, {Masks} from 'react-native-mask-input';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useDispatch } from 'react-redux';

import RegisterActions from '../../store/ducks/register';
import FooterAuth from '../../components/FooterAuth';
import Container from '../../components/Container';
import InputAuth from '../../components/InputAuth';
import ButtonAuth from '../../components/Button';

const Cadastro = ({ navigation, route, options, back }) => {

  //True para Prestador
  const [dsTipoUsuario, setDsTipoUsuario] = useState(Boolean);
  
  const [nmUsuario, setNmUsuario] = useState(String);
  const [cdCPF, setCdCPF] = useState(String);
  const [dsEmail, setDsEmail] = useState(String);
  const [cdSenha, setCdSenha] = useState(String);
  const [cdConfirmarSenha, setCdConfirmarSenha] = useState(String);
  const [cdTelefone, setCdTelefone] = useState(String);

  const dispatch = useDispatch();

  const handleNextStep = () =>{
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if(nmUsuario.length < 5){
      showMessage({
        message: "Dados incorretos!",
        description: "Nome incorreto, digite novamente.",
        type: "danger",
        duration: 2350,
        icon: "auto"
      });
      return null;
    }
    else if(cdCPF.length < 14){
      showMessage({
        message: "Dados incorretos!",
        description: "CPF inválido, digite novamente.",
        type: "danger",
        duration: 2350,
        icon: "auto"
      });
      return null;
    }
    else if(!regEmail.test(dsEmail)){
      showMessage({
        message: "Dados incorretos!",
        description: "Email inválido, digite novamente.",
        type: "danger",
        duration: 2350,
        icon: "auto"
      });
      return null;
    }
    else if(cdSenha.length < 6 || cdConfirmarSenha.length < 6){
      showMessage({
        message: "Dados incorretos!",
        description: "Senha inválida, digite novamente.",
        type: "danger",
        duration: 2350,
        icon: "auto"
      });      
      return null;
    }
    else if(cdConfirmarSenha != cdSenha){
      showMessage({
        message: "Dados incorretos!",
        description: "As senhas não correspondem, digite novamente.",
        type: "danger",
        duration: 2350,
        icon: "auto"
      });      
      return null;
    }
    else if(cdTelefone.length < 14){
      showMessage({
        message: "Dados incorretos!",
        description: "Senha inválida, digite novamente.",
        type: "danger",
        duration: 2350,
        icon: "auto"
      });      
      return null;
    }

    const data = {
      nmUsuario : nmUsuario,
      cdCPF : cdCPF,
      dsEmail : dsEmail,
      cdTelefone: cdTelefone,
      dsTipoUsuario : dsTipoUsuario ? "Prestador" : "Contratante",
      cdSenha: cdSenha,
      cdConfirmarSenha: cdConfirmarSenha
    }

    dispatch(RegisterActions.addUserRegister(data))
    navigation.navigate('CadastroEndereco')

  }
  
  return (
    <Container>
      <View style={styles.Formulario}>

        <Icon size={30} name={"arrow-back-ios"} style={styles.BackIcon} onPress={() => {navigation.goBack()}}/>

        <Text style={styles.Titulo}>Cadastro</Text>

        <InputAuth  icon={"account"} 
                    placeholder={"Nome Completo"} 
                    onChangeText={setNmUsuario}
                    value={nmUsuario}
                    maxLength={100} 
                    autoComplete={"name"}/>

        <InputAuth  mask={Masks.BRL_CPF} 
                    icon={"card-account-details"} 
                    placeholder={"CPF"} 
                    onChangeText={(masked, unmasked) => {setCdCPF(masked);}}
                    value={cdCPF}
                    maxLength={100}
                    keyboardType={"numeric"} />
 
        <InputAuth  icon={"at"} 
                    placeholder={"E-mail"} 
                    onChangeText={setDsEmail}
                    value={dsEmail}
                    maxLength={100} 
                    autoComplete={"email"} 
                    keyboardType={"email-address"}/>

        <InputAuth  icon={"lock"} 
                    placeholder={"Senha"} 
                    onChangeText={setCdSenha}
                    value={cdSenha}
                    maxLength={100} 
                    textContentType='password' 
                    secureTextEntry={true}
                    autoComplete={"password"}/>

        <InputAuth  icon={"lock"} 
                    placeholder={"Confirmar Senha"} 
                    onChangeText={setCdConfirmarSenha}
                    value={cdConfirmarSenha}
                    maxLength={100} 
                    textContentType='password' 
                    secureTextEntry={true}/>

        <InputAuth  mask={Masks.BRL_PHONE} 
                    icon={"phone"} 
                    placeholder={"Celular"} 
                    onChangeText={setCdTelefone}
                    value={cdTelefone}
                    maxLength={100} 
                    autoComplete={"tel"}
                    keyboardType={"phone-pad"}/>
        
        <ContainerSelect>
          <SelectLeft style={{backgroundColor: dsTipoUsuario ? '#F0D22F' : '#FFF' }} onPress={() =>{setDsTipoUsuario(true)}}>
            <TextMiddle>Prestador</TextMiddle>
            <SubTextMiddle>Realizar serviços.</SubTextMiddle>
          </SelectLeft>
          <SelectRight style={{backgroundColor: dsTipoUsuario ? '#FFF' : '#F0D22F' }} onPress={() =>{setDsTipoUsuario(false)}}>
            <TextMiddle>Contratante</TextMiddle>
            <SubTextMiddle>Necessita de um serviço.</SubTextMiddle>
          </SelectRight>
        </ContainerSelect>

        <ButtonAuth text={"Continuar"} onPress={() => handleNextStep()}/>

        <Text style={styles.PossuiConta}>
          Já possui uma conta?
          <Text style={styles.PossuiContaAmarelo} onPress={() => { navigation.navigate('Login') }}> Entrar</Text>
        </Text>

      </View>

      <FooterAuth />
    </Container>
  );
};

const styles = StyleSheet.create({
  Formulario:{
    alignSelf: 'center',
    width: '85%',
    height: '80%',
    marginTop: '1%'
  },
  BackIcon:{
    color: '#F0D22F'
  },
  Titulo: {
    alignSelf: "flex-start",
    fontSize: 30,
    color: "#1A1D1E",
    fontFamily: 'Poppins-Bold',
    marginTop: '5%'
  },
  PossuiConta:{
    fontFamily: 'Poppins-Medium',
    fontSize:16,
    alignSelf: 'center',
    flexDirection: 'row',
    color: "#1A1D1E",
  },
  PossuiContaAmarelo:{
    color: '#F0D22F'
  }
});

const ContainerSelect = styled.View`
  width: 100%;
  height: 68;
  align-self: center;
  flex-direction: row;
  border-radius: 12px;
  border: 2px;
  border-color: #F0D23F;
`;

const SelectLeft = styled.TouchableOpacity`
  flex: 1;
  text-align: center;
  align-items: center;
  vertical-align: bottom;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  background-color: #F0D23F;
`;

const SelectRight = styled.TouchableOpacity`
  flex: 1;
  text-align: center;
  align-items: center;
  vertical-align: bottom;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  background-color: #FFF;
`;

const TextMiddle = styled.Text`
  align-self: center;
  margin-top: 1px;
  font-family: 'Poppins-Bold';
  font-size: 20;
  color: '#0C0C0C';
`;

const SubTextMiddle = styled.Text`
  align-self: center;
  font-family: 'Poppins-Regular';
  font-size: 12;
  margin-bottom: 1px;
`;

export default Cadastro;
