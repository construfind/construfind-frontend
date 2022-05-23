import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Pressable, Keyboard, Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components/native';
import Modal from "react-native-modal";
import { Masks } from 'react-native-mask-input';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, InputAuth, Loader } from '../../../components';
import load from '../../../assets/images/Loading.gif';
import { FONTS, COLORS } from '../../../assets/constants';
import { ViaCepHook } from '../../../utils/ViaCepIntegration';
import AuthenticateActions from '../../../store/ducks/authenticate';
import { api } from '../../../services/api';

const Perfil = ({ navigation }) => {
  SplashScreen.hide();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(null);
  const { cpf } = useSelector(({ authenticate: { user } }) => user);

  const [modalVisible, setModalVisible] = useState(false);

  const [nmCompleto, setNmCompleto] = useState("");
  const [dsTipoUsuario, setDsTipoUsuario] = useState("");
  const [cdCEP, setCdCEP] = useState("");
  const [dsLogradouro, setDsLogradouro] = useState("");
  const [dsNumero, setDsNumero] = useState("");
  const [nmBairro, setNmBairro] = useState("");
  const [nmCidade, setNmCidade] = useState("");
  const [nmEstado, setNmEstado] = useState("");
  const [cdTelefone, setCdTelefone] = useState("");

  useEffect(() => {
    getUserData();
  }, [])

  const setAddressFields = (data) =>{
    setDsLogradouro(data.logradouro);
    setNmBairro(data.bairro);
    setNmCidade(data.localidade);
    setNmEstado(data.uf);
    setIsLoading(false);
  }

  const handleAddress = (CEP = null) =>{
    setIsLoading(true);
    ViaCepHook(CEP ? CEP : cdCEP).then((res) =>{
      setAddressFields(res.data);
    }).catch((err) =>{
      showMessage({
        message: "Erro!",
        description: "Não foi possível encontrar seu endereço, tente novamente mais tarde.",
        type: "danger"
      });
      console.log("Error CEP: ", err)
      setIsLoading(false);
    });
  }

  const getUserData = async () =>{
    const url = 'api/Usuario/user-read/' + cpf;

    console.log("User url: ", url);

    setIsLoading(true)

    await api
      .get(url)
      .then(async ( { data } ) => {
        setNmCompleto(data.nomeCompleto);
        setDsTipoUsuario(data.tipoUsuario);
        setCdCEP(data.codigoCEP);
        setDsLogradouro(data.nomeLogradouro);
        setDsNumero(data.numeroEndereco);
        setNmBairro(data.nomeBairro);
        setNmCidade(data.nomeCidade);
        setNmEstado(data.siglaEstado);
        setCdTelefone(data.phoneNumber);
      })
      .catch((err) => {
          console.log("Error Buscar: ", err);
      })
      .finally(() => setIsLoading(false))
  }

  const alertSignOut = () =>{
    Alert.alert(
      "Sair",
      "Deseja realmente sair da sua conta?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Sim", 
          onPress: () => handleSignOut()
        }
      ]
    );
  }

  const alertUserDelete = () =>{
    Alert.alert(
      "Apagar conta",
      "Deseja realmente apagar a sua conta? Esse é um processo irreversível!",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Sim", 
          onPress: () => handleUserDelete()
        }
      ]
    );
  }

  const handleSignOut = () =>{
    dispatch(AuthenticateActions.removeToken());
    dispatch(AuthenticateActions.removeUser());
  }

  const handleUserDelete = async () =>{
    const url = 'api/Usuario/user-delete';

    setIsLoading(true);

    await api
      .delete(url, { params: {CPF: cpf} })
      .then(async ( { data } ) => {
        handleSignOut();
      })
      .catch((err) => {
          console.log("Error Deletar: ", err);
      })
      .finally(() => setIsLoading(false))
  }

  const handleUserModify = async () =>{

    setModalVisible(false);

    const url = 'api/Usuario/user-modify'
    const body = { 
      endereco: {
        cep: cdCEP,
        rua: dsLogradouro,
        numero: dsNumero,
        bairro: nmBairro,
        cidade: nmCidade,
        uf: nmEstado
      }, 
      telefone: cdTelefone 
    }
    console.log("Alterar data: ", body);

    setIsLoading(true)

    await api
      .put(url, body, { params: {CPF: cpf} })
      .then(async ( data ) => {
        showMessage({
          message: "Sucesso!",
          description: "Dados alterados com sucesso!",
          type: "success",
          duration: 2350,
          icon: "auto"
        });

        setModalVisible(false);

      })
      .catch((err) => {
          console.log("Error alterar: ", err);
          showMessage({
            message: "Erro ao realizar as alterações!",
            description: "Error",
            type: "danger",
            duration: 2350,
            icon: "auto"
          });

      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Container>
      
      <Icon size={35} name={"logout"} style={styles.SignOutIcon} onPress={() => {alertSignOut()}}/>

      <ImagemPerfil source={load} />
      <NomePerfil>{nmCompleto}</NomePerfil>
      <InfoPerfil>

        <View style={{flexDirection: 'row'}}>
          <InfoTitle>Localidade: </InfoTitle><InfoData>{nmCidade} / {nmEstado}</InfoData>
        </View>

        <View style={{flexDirection: 'row'}}>
          <InfoTitle>Telefone: </InfoTitle><InfoData>{cdTelefone}</InfoData>          
        </View>

        <View style={{flexDirection: 'row'}}>
          <InfoTitle>Documento: </InfoTitle><InfoData>{cpf}</InfoData>          
        </View>

        <View style={{flexDirection: 'row'}}>
          <InfoTitle>Tipo Usuário: </InfoTitle><InfoData>{dsTipoUsuario}</InfoData>          
        </View>

        <DeleteIcon onPress={() => {alertUserDelete()}}>
          <Icon color={'red'} size={30} name={"delete"}/>
        </DeleteIcon>

        <ButtonEdit onPress={() => setModalVisible(true)}>
          <ButtonText>EDITAR PERFIL</ButtonText>
        </ButtonEdit>

      </InfoPerfil>

      <Modal testID={'modalAlterarUsuario'}
             isVisible={modalVisible}
             onBackdropPress={() => setModalVisible(false)}>

        <View style={styles.modalView}>
          
          <Icon size={35} name={"close"} style={styles.CloseIcon} onPress={() => setModalVisible(false)}/>

          <InputAuth  mask={Masks.ZIP_CODE}
                      icon={"map-marker"} 
                      placeholder={"CEP"} 
                      onChangeText={(masked, unmasked) => {
                                      setCdCEP(unmasked);
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

          <InputAuth  mask={Masks.BRL_PHONE} 
                    icon={"phone"} 
                    placeholder={"Celular"} 
                    onChangeText={setCdTelefone}
                    value={cdTelefone}
                    maxLength={100} 
                    autoComplete={"tel"}
                    keyboardType={"phone-pad"}/>            

          <ButtonEdit onPress={() => handleUserModify()}>
            <ButtonText>CONFIRMAR</ButtonText>
          </ButtonEdit>
        </View>
      </Modal>

      <Loader loading={isLoading} />
    </Container>
  )
};

const ImagemPerfil = styled.Image`
  border-radius: 100;
  width: 150;
  height: 150;
  align-self: center;
  margin-top: 10px;
`;

const NomePerfil = styled.Text`
  align-self: center;
  text-align: center;
  font-size: 28;
  color: ${COLORS.textColor};
  font-family: ${FONTS.semiBold};
`;

const InfoPerfil = styled.View`
  flex-direction: column;
  width: 80%;
  align-self: center;
  background-color: white;
  height: 200px;
  margin-top: 10px;
  border-radius: 25;
  padding: 15px;
`;

const InfoTitle = styled.Text`
  font-family: ${FONTS.semiBold};
  font-size: 15;
  color: #151313;
`;

const InfoData = styled.Text`
  font-family: ${FONTS.regular};
  font-size: 15;
  color: #6A6A6A;
`;

const ButtonEdit = styled.TouchableOpacity`
  position: absolute;
  align-self: flex-end;
  bottom: 15;
  right: 15;
  width: 60%;
  background-color: ${COLORS.primary};
  align-items: center;
  border-radius: 20;
  height: 45px;
`;

const ButtonText = styled.Text`  
  font-family: ${FONTS.semiBold};
  font-size: 18;
  color: #0C0C0C;
  align-self: center;
  margin-top: auto;
  margin-bottom: auto;
`;

const DeleteIcon = styled.TouchableOpacity`
  position: absolute;
  align-self: flex-end;
  bottom: 15;
  left: 15;
  width: 45;
  background-color: 'transparent';
  align-items: center;
  justify-content: center;
  border-radius: 20;
  border-color: red;
  border: solid red;
  height: 45;

`;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 625
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  CloseIcon:{
    color: COLORS.primary,
    alignSelf: "flex-end",
    marginBottom: '5%',
    marginTop: '-5%'
  },
  SignOutIcon:{
    color: 'red',
    right: 0,
    position: 'absolute',
    margin: 10
  }
});

export default Perfil;
