import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Pressable, Keyboard, Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Modal from "react-native-modal";
import { showMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { api } from '../../../services/api';
import { Container, WelcomeHeader, ServicosContratante, Loader, InputAuth } from '../../../components';
import { FONTS, COLORS } from '../../../assets/constants';

const Inicio = () => {
  const dispatch = useDispatch();  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDataList, setIsLoadingDataList] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataServicos, setDataServicos] = useState([{}]);
  const token = useSelector(({ authenticate: { token } }) => token);
  const { nomeCompleto } = useSelector(({ authenticate: { user } }) => user);

  const [nmTitulo, setNmTitulo] = useState("");
  const [nmLocal, setNmlocal] = useState("");
  const [nmTipoServico, setNmTipoServico] = useState("");
  const [dsServico, setDsServico] = useState("");

  SplashScreen.hide();
  
  useEffect(() =>{
    handleData();
  },[])

  const handleData = async () => {
    const url = 'api/Servico/service-read-user';
    const config = { headers: { Authorization: `Bearer ${token}` } }
  
    await api
      .get(url, config)
      .then(async ( { data } ) => {
        setDataServicos(data);
      })
      .catch((err) => {
          console.log("Error Buscar: ", err);
      })
      .finally(() => {setIsLoading(false); setIsLoadingDataList(false)})
  };

  const refreshData = () => {
    setIsLoadingDataList(true);
    setIsLoading(false);
    handleData();
  }

  const handleAddService = async () =>{
    setIsLoading(true);
    setIsModalVisible(true);
  
    const url = 'api/Servico/service-add';
    const config = { headers: { Authorization: `Bearer ${token}` } }

    const body = { 
      titulo: nmTitulo,
      local: nmLocal,
      tipoServico: nmTipoServico,
      descricao: dsServico,
    }
  
    await api
      .post(url, body, config)
      .then(async ( data ) => {
        showMessage({
          message: "Sucesso!",
          description: "Serviço criado com sucesso!",
          type: "success",
          duration: 2350,
          icon: "auto"
        });

        setNmTitulo("");
        setNmlocal("");
        setNmTipoServico("");
        setDsServico("");
  
        setIsModalVisible(false);
        refreshData();
  
      })
      .catch((err) => {
          console.log("Error alterar: ", err);
          showMessage({
            message: "Erro ao criar o serviço!",
            description: "Error",
            type: "danger",
            duration: 2350,
            icon: "auto"
          });
  
      })
      .finally(() => {
        setIsLoading(false);
        setIsModalVisible(false);
      })
  }

  return (
    <Container>
      <WelcomeHeader nomeUsuario={nomeCompleto}/>
      <ServicosContratante data={dataServicos}
                           onRefresh={refreshData}
                           refreshing={isLoadingDataList}
                           loadingAnimation={(state) => setIsLoading(state)}
                           refreshDataAfter={() => refreshData()}
                           btnAddService={(state) => setIsModalVisible(state)}
                           />



      <Modal testID={"ModalAddService"}
             isVisible={isModalVisible}
             style={{
              position:'absolute'
             }}
             onBackdropPress={() => setIsModalVisible(false)}>

        <View style={styles.modalView}>
          
          <Icon size={35} name={"close"} style={styles.CloseIcon} onPress={() => setIsModalVisible(false)}/>

          <InputAuth  icon={"subtitles-outline"} 
                      placeholder={"Titulo"} 
                      onChangeText={setNmTitulo}
                      value={nmTitulo}
                      maxLength={100} 
                      editable={true}/>        

          <InputAuth  icon={"home-city"} 
                      placeholder={"Local"} 
                      onChangeText={setNmlocal}
                      value={nmLocal}
                      maxLength={100} 
                      editable={true}
                      keyboardType={"numeric"}/>

          <InputAuth  icon={"format-list-bulleted-type"} 
                      placeholder={"Tipo do Servico"} 
                      onChangeText={setNmTipoServico}
                      value={nmTipoServico}
                      maxLength={100} 
                      editable={true}/>

          <InputAuth  icon={"form-textbox"} 
                      placeholder={"Descrição"} 
                      onChangeText={setDsServico}
                      value={dsServico}
                      maxLength={1000} 
                      editable={true}
                      height={200}
                      multiline={true}/>           

          <ButtonEdit onPress={() => handleAddService()}>
            <ButtonText>CADASTRAR</ButtonText>
          </ButtonEdit>
        </View>
      </Modal>

      <Loader loading={isLoading} />
    </Container>
  )
};

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

export default Inicio;
