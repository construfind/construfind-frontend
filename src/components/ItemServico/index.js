import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import Modal from "react-native-modal";

import { COLORS, FONTS } from '../../assets/constants';
import load from '../../assets/images/Loading.gif';
import { api } from '../../services/api';
import { InputAuth } from '../../components';
import { useEffect } from 'react';

const ItemServico = ( props ) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const token = useSelector(({ authenticate: { token } }) => token);

  const [nmTitulo, setNmTitulo] = useState("");
  const [nmLocal, setNmlocal] = useState("");
  const [nmTipoServico, setNmTipoServico] = useState("");
  const [dsServico, setDsServico] = useState("");

  useEffect(()=>{
    setNmTitulo(props.titulo);
    setNmlocal(props.local);
    setNmTipoServico(props.tipoServico);
    setDsServico(props.descricao);
  }, [])


  const alertServiceDelete = () =>{
    Alert.alert(
      "Apagar serviço",
      "Deseja realmente apagar esse serviço? Esse é um processo irreversível!",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Sim", 
          onPress: () => handleDeleteService()
        }
      ]
    );
  }
  
  const handleUpdateService = async () =>{
  
    setIsModalVisible(true);
  
    const url = 'api/Servico/service-modify';
    const config = { headers: { Authorization: `Bearer ${token}` },
    params: {idServico: props.idServico}
  }
    const body = { 
      titulo: nmTitulo,
      local: nmLocal,
      tipoServico: nmTipoServico,
      descricao: dsServico,
    }
  
    props.loadingAnimation(true)
  
    await api
      .put(url, body, config)
      .then(async ( data ) => {
        showMessage({
          message: "Sucesso!",
          description: "Dados alterados com sucesso!",
          type: "success",
          duration: 2350,
          icon: "auto"
        });
  
        setIsModalVisible(false);
  
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
      .finally(() => {
        props.loadingAnimation(false);
        setIsModalVisible(false);       
        props.refreshData();
      })
  }
  
  const handleDeleteService = async () =>{
    const url = 'api/Servico/service-delete';
    const config = { headers: { Authorization: `Bearer ${token}` },
                     params: {idServico: props.idServico}
                   }
  
    props.loadingAnimation(true);
  
    await api
      .delete(url, config)
      .then(async ( { data } ) => {  
        setNmTitulo("");
        setNmlocal("");
        setNmTipoServico("");
        setDsServico("");
        showMessage({
          message: "Sucesso!",
          description: "Serviço deletado com sucesso!",
          type: "success",
          duration: 2350,
          icon: "auto"
        });
      })
      .catch((err) => {
          console.log("Error Deletar: ", err);
          showMessage({
            message: "Erro!",
            description: "Não foi possível deletar o serviço!",
            type: "danger",
            duration: 2350,
            icon: "auto"
          });
      })
      .finally(() => { 
        props.loadingAnimation(false);
        setIsModalVisible(false);       
        props.refreshData();
      })
  }

  return (
    <Container>
      <ConteudoItem>
        <ImagemPrincipal source={load} />

        <ColunaInfos>
          <NomeTipo>
            <TituloServico>{props.titulo}</TituloServico>
            <NomeContratante>{props.estado}</NomeContratante>
          </NomeTipo>
          <Avaliacao>
            <Estrela name="star" size={30} color={COLORS.primary} />
            <Estrela name="star" size={30} color={COLORS.primary} />
            <Estrela name="star" size={30} color={COLORS.primary} />
            <Estrela name="star-half-o" size={30} color={COLORS.primary} />
            <Estrela name="star-o" size={30} color={COLORS.primary} />
          </Avaliacao>
          <Fotos>
            <ImagemMini source={load} />
            <ImagemMini source={load} />
            <ImagemMini source={load} />
            <ImagemMini source={load} />
          </Fotos>
        </ColunaInfos>
      </ConteudoItem>
      <ConteudoBotoes>
        <DeleteServico onPress={() => alertServiceDelete()}>
          <Icon color={COLORS.red} size={30} name={"trash"}/>
        </DeleteServico>
        <UpdateServico onPress={() => setIsModalVisible(true)}>
          <Icon color={COLORS.blue} size={30} name={"pencil"}/>
        </UpdateServico>
      </ConteudoBotoes>

      <Modal testID={props.idServico}
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
                      editable={true}/>

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

          <ButtonEdit onPress={() => handleUpdateService()}>
            <ButtonText>SALVAR</ButtonText>
          </ButtonEdit>
        </View>
      </Modal>

    </Container>
  );
}

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

const DeleteServico = styled.TouchableOpacity`
  width: 45;
  align-items: center;
  justify-content: center;
  border-radius: 200;
  border-color: ${COLORS.red};
  border: solid ${COLORS.red};
  height: 45;
`;

const UpdateServico = styled.TouchableOpacity`
  width: 45;
  align-items: center;
  justify-content: center;
  border-radius: 200;
  border-color: ${COLORS.blue};
  border: solid ${COLORS.blue};
  height: 45;
`;

const ButtonText = styled.Text`  
  font-family: ${FONTS.semiBold};
  font-size: 18;
  color: #0C0C0C;
  align-self: center;
`;

const Container = styled.View`
  border-radius: 20;
  padding: 2%;
  background-color: ${COLORS.white};
  margin-bottom: 15;
`;

const NomeTipo = styled.View`
`;

const Avaliacao = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

const Fotos = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ColunaInfos = styled.View`
  width: 60%;
  margin: auto;
`;

const NomeContratante = styled.Text`
  font-family: ${FONTS.medium};
  font-size: 15;
  color: ${COLORS.gray};
`;

const TituloServico = styled.Text`
  font-family: ${FONTS.medium};
  font-size: 16;
  color: ${COLORS.textColor};
`;

const ImagemPrincipal = styled.Image`
  width: 110;
  height: 127;
  border-radius: 15;
`;

const ImagemMini = styled.Image`
  width: 45;
  height: 45;
  border-radius: 10;
  align-self: flex-start;
`;

const ConteudoItem = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ConteudoBotoes = styled.View`
  flex-direction: row-reverse;
  justify-content: space-between;
  height: 60;
`;

const Estrela = styled(Icon)`
`;

export default ItemServico;
