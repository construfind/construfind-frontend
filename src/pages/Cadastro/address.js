import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import MaskInput, {Masks} from 'react-native-mask-input';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import FooterAuth from '../../components/FooterAuth';
import Container from '../../components/Container';
import InputAuth from '../../components/InputAuth';
import ButtonAuth from '../../components/Button';
import { ViaCepHook } from '../../utils/ViaCepIntegration';
import { Loader } from '../../components';
import { ValidaResponse } from '../../utils/ResponseValidators';
import { api } from '../../services/api';
import RegisterActions from '../../store/ducks/register';

const CadastroEndereco = ({ navigation, route, options, back }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(null);
  const dispatch = useDispatch();
  const {
    nmUsuario,
    cdCPF,
    dsEmail,
    cdTelefone,
    dsTipoUsuario,
    cdSenha,
    cdConfirmarSenha
  } = useSelector(({ register: { userRegister } }) => userRegister)  

  const [cdCEP, setCdCEP] = useState(String);
  const [dsLogradouro, setDsLogradouro] = useState(String);
  const [dsNumero, setDsNumero] = useState(String);
  const [nmBairro, setNmBairro] = useState(String);
  const [nmCidade, setNmCidade] = useState(String);
  const [nmEstado, setNmEstado] = useState(String);

  useEffect(() => {
    const subscribe = NetInfo.addEventListener(({ isConnected }) => setIsOnline(isConnected))
    return () => {
      subscribe()
    }
  }, [])

  const setAddressFields = (data) =>{
    setDsLogradouro(data.logradouro);
    setNmBairro(data.bairro);
    setNmCidade(data.localidade);
    setNmEstado(data.uf);
    setIsLoading(false);
  }
  
  const handleAddress = () =>{
    setIsLoading(true);
    ViaCepHook(cdCEP).then((res) =>{
      setAddressFields(res.data);
    }).catch((err) =>{
      showMessage({
        message: "Erro!",
        description: "Não foi possível encontrar seu endereço, tente novamente mais tarde.",
        type: "danger"
      });
      console.log("Error CEP: " + err)
      setIsLoading(false);
    });
  }

  const handleSignUp = async () =>{
    if(cdCEP.length == 0){
      showMessage({
        message: "Dados incorretos!",
        description: "Por favor, insira o CEP corretamente.",
        type: "danger",
        duration: 2350,
        icon: "auto"
      });
      return null;
    }
    else if(dsLogradouro.length == 0){
      showMessage({
        message: "Dados incorretos!",
        description: "Por favor, insira a Rua corretamente.",
        type: "danger",
        duration: 2350,
        icon: "auto"
      });
      return null;
    }
    else if(dsNumero.length == 0){
      showMessage({
        message: "Dados incorretos!",
        description: "Por favor, insira o Número corretamente.",
        type: "danger",
        duration: 2350,
        icon: "auto"
      });
      return null;
    }
    else if(nmBairro.length == 0){
      showMessage({
        message: "Dados incorretos!",
        description: "Por favor, insira o Bairro corretamente.",
        type: "danger",
        duration: 2350,
        icon: "auto"
      });      
      return null;
    }
    else if(nmCidade.length == 0){
      showMessage({
        message: "Dados incorretos!",
        description: "Por favor, insira a Cidade corretamente.",
        type: "danger",
        duration: 2350,
        icon: "auto"
      });      
      return null;
    }
    else if(nmEstado.length == 0){
      showMessage({
        message: "Dados incorretos!",
        description: "Por favor, insira o Estado corretamente.",
        type: "danger",
        duration: 2350,
        icon: "auto"
      });      
      return null;
    }    
    
    const url = 'api/Usuario/user-register'
    const body = {
      nome: nmUsuario,
      documento: cdCPF,
      email: dsEmail,
      telefone: cdTelefone,
      tipoUsuario: dsTipoUsuario,
      endereco: {
        cep: cdCEP,
        rua: dsLogradouro,
        numero: dsNumero,
        bairro: nmBairro,
        cidade: nmCidade,
        uf: nmEstado
      },
      senha: cdSenha,
      senhaConfirmacao: cdConfirmarSenha
    };

    setIsLoading(true);

    if (isOnline) {
      await api.post(url, body)
        .then(async (data) => {
          console.log("Sucesso: ", data);
          showMessage({
            message: "Sucesso!",
            description: "Seja bem vindo(a) a nossa plataforma, você já pode começar a utilizar as funcionalidades!",
            type: "success",
            duration: 2350,
            icon: "auto"
          });
          dispatch(RegisterActions.removeUserRegister())
          navigation.navigate('Login')
        })
        .catch(err => {

            showMessage({
              message: "Erro ao realizar o cadastro!",
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

  return (
    <Container>
      <View style={styles.Formulario}>

        <Icon size={30} name={"arrow-back-ios"} style={styles.BackIcon} onPress={() => {navigation.goBack()}}/>

        <Text style={styles.Titulo}>Dados de endereço</Text>

        <InputAuth  mask={Masks.ZIP_CODE}
                    icon={"map-marker"} 
                    placeholder={"CEP"} 
                    onChangeText={(masked, unmasked) => {
                                    setCdCEP(masked);
                                    if(unmasked.length == 8){
                                      Keyboard.dismiss();
                                    }
                                 }}
                    value={cdCEP}
                    maxLength={9}
                    keyboardType={"numeric"}
                    onBlur={() => handleAddress()}/>

        <InputAuth  icon={"road-variant"} 
                    placeholder={"Rua"} 
                    onChangeText={setDsLogradouro}
                    value={dsLogradouro}
                    maxLength={100} 
                    editable={false}/>        
        
        <InputAuth  icon={"numeric"} 
                    placeholder={"Numero"} 
                    onChangeText={setDsNumero}
                    value={dsNumero}
                    maxLength={7} 
                    editable={true}
                    keyboardType={"numeric"}/>

        <InputAuth  icon={"home-city"} 
                    placeholder={"Bairro"} 
                    onChangeText={setNmBairro}
                    value={nmBairro}
                    maxLength={100} 
                    editable={false}/>

        <InputAuth  icon={"city"} 
                    placeholder={"Cidade"} 
                    onChangeText={setNmCidade}
                    value={nmCidade}
                    maxLength={100} 
                    editable={false}/>

        <InputAuth  icon={"city-variant"} 
                    placeholder={"Estado"} 
                    onChangeText={setNmEstado}
                    value={nmEstado}
                    maxLength={100} 
                    editable={false}/>
        
        <ButtonAuth text={"Finalizar"} onPress={handleSignUp}/>

        <Text style={styles.PossuiConta}>
          Já possui uma conta?
          <Text style={styles.PossuiContaAmarelo} onPress={() => { navigation.navigate('Login') }}> Entrar</Text>
        </Text>

      </View>

      <FooterAuth />
      <Loader loading={isLoading} />
    </Container>
  );
};

const styles = StyleSheet.create({
  Formulario:{
    alignSelf: 'center',
    width: '85%',
    height: '80%',
    marginTop: '5%'
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
  height: 10%;
  align-self: center;
  flex-direction: row;
  border-radius: 12px;
  border: 1px;
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

export default CadastroEndereco;
