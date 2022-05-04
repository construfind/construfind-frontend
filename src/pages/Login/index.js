import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, BackHandler, StatusBar, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useToast } from 'native-base';
import { useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { Masks } from 'react-native-mask-input';
import { showMessage, hideMessage } from "react-native-flash-message";

import FooterAuth from '../../components/FooterAuth';
import Container from '../../components/Container';
import InputAuth from '../../components/InputAuth';
import ButtonAuth from '../../components/Button';
import { Loader } from '../../components';
import { Images, COLORS, FONTS } from '../../assets/constants';
import { api } from '../../services/api';
import AuthenticateActions from '../../store/ducks/authenticate';
import { ValidaResponse } from '../../utils/ResponseValidators';

const Login = ({ navigation, route, options, back }) => {
  const [cdCPF, setCdCPF] = useState(String);
  const [cdSenha, setCdSenha] = useState(String);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();

  function connLess() {
    showMessage({
      message: "Sem conexão!",
      description: "Verifique seu status de rede e tente novamente.",
      type: "danger",
      autoHide: false
    });    
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', BackHandler.exitApp)
    const subscribe = NetInfo.addEventListener(({ isConnected }) => setIsOnline(isConnected))

    return () => {
      backHandler.remove()
      subscribe()
    }
  }, [])

  async function handleSignIn() {
    if(cdCPF.length < 14){
      showMessage({
        message: "Dados incorretos!",
        description: "CPF inválido, digite novamente.",
        type: "danger",
        duration: 2350,
icon: "auto"
      });
      return null;
    }

    if(cdSenha.length < 6){
      showMessage({
        message: "Dados incorretos!",
        description: "Senha inválida, digite novamente.",
        type: "danger"
      });      
      return null;
    }

    const url = 'api/Usuario/user-auth'
    const body = { cpf: cdCPF, senha: cdSenha }

    setIsLoading(true)

    if (isOnline) {
      await api
        .post(url, body)
        .then(async (data) => {
          showMessage({
            message: "Sucesso!",
            description: "Seja bem vindo novamente, " + data.data.userInfo.nome,
            type: "success",
            duration: 2350,
            icon: "auto"
          });
          dispatch(AuthenticateActions.addUser(data))
          navigation.navigate('Inicio')
        })
        .catch(err => {

            showMessage({
              message: "Erro ao realizar login!",
              description: ValidaResponse(err.response.data.errors),
              type: "danger",
              duration: 2350,
              icon: "auto"
            });

        })
        .finally(() => setIsLoading(false))
    } else {
      connLess()
      setIsLoading(false)
    }
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>

        <View style={styles.Formulario}>
          <Text style={styles.Titulo}>Bem-vindo!</Text>
          <Text style={styles.SubTitulo}>LOGIN</Text>

          <InputAuth  mask={Masks.BRL_CPF}
                      icon={"card-account-details"} 
                      placeholder={"CPF"} 
                      onChangeText={(masked, unmasked) => {setCdCPF(masked);}}
                      value={cdCPF}
                      maxLength={20}
                      keyboardType={"numeric"}/>

          <InputAuth  icon={"lock"} 
                      placeholder={"Senha"} 
                      onChangeText={setCdSenha}
                      value={cdSenha}
                      maxLength={100} 
                      textContentType='password' 
                      secureTextEntry={true}
                      autoComplete={"password"}/>

          <Text style={styles.SenhaRecovery}>Esqueci minha senha</Text>

          <ButtonAuth text={"ENTRAR"} onPress={() => handleSignIn()}/>
        
          <Text style={styles.NovoUsuario}>
            Novo usuário?
            <Text style={styles.NovoUsuarioAmarelo} onPress={() => { navigation.navigate('Cadastro') }}> Crie sua Conta</Text>
          </Text>          

        </View>

        <FooterAuth />
        <Loader loading={isLoading} />

      </Container >
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  Formulario:{
    alignSelf: 'center',
    width: '85%',
    height: '65%',
    marginTop: '20%'
  },
  Titulo: {
    alignSelf: "center",
    fontSize: 30,
    color: "#1A1D1E",
    fontFamily: 'Poppins-Bold',
    marginBottom: '5%'
  },    
  SubTitulo: {
    alignSelf: "center",
    fontSize: 16,
    color: "#6A6A6A",
    fontFamily: 'Poppins-Regular',
    marginBottom: '8%'
  },
  SenhaRecovery:{
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#6A6A6A",
    fontFamily: 'Poppins-Regular'
  },
  NovoUsuario:{
    fontFamily: 'Poppins-Medium',
    fontSize:16,
    alignSelf: 'center',
    flexDirection: 'row',
    color: "#1A1D1E",
  },
  NovoUsuarioAmarelo:{
    color: '#F0D22F'
  }
});

export default Login;
