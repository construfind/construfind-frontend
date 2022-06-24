import React from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";

import { COLORS, FONTS } from '../../assets/constants';
import load from '../../assets/images/Loading.gif';
import { api } from '../../services/api';

const ItemServicoPrestadorAndamento = ( props ) => {
  const token = useSelector(({ authenticate: { token } }) => token);

  const alertServiceUnApply = () =>{
    Alert.alert(
      "Cancelar candidatura",
      "Deseja realmente cancelar esse serviço?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Sim", 
          onPress: () => handleUnApplyService()
        }
      ]
    );
  }

  const handleUnApplyService = async () =>{
    const url = 'api/Servico/service-unapply';
    const config = { params: { idServico: props.idServico },
                      headers: { Authorization: `Bearer ${token}` } }
    const data = {};

    props.loadingAnimation(true);
  
    await api
      .put(url, data, config)
      .then(async ( { data } ) => {  
        showMessage({
          message: "Sucesso!",
          description: "Candidatura cancelada com sucesso!",
          type: "success",
          duration: 2350,
          icon: "auto"
        });
        props.refreshData();
      })
      .catch((err) => {
          console.log("Error Candidatar: ", err);
          showMessage({
            message: "Erro!",
            description: "Não foi possível cancelar a candidatura no serviço!",
            type: "danger",
            duration: 2350,
            icon: "auto"
          });
      })
      .finally(() => { 
        props.loadingAnimation(false); 
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
        <ButtonApply onPress={() => alertServiceUnApply()}>
            <ButtonText>CANCELAR</ButtonText>
        </ButtonApply>
      </ConteudoBotoes>

    </Container>
  );
}

const ButtonApply = styled.TouchableOpacity`
  justify-content: center;
  align-content: center;
  width: 50%;
  background-color: ${COLORS.primary};
  height: 40;
  border-radius: 20;
  margin-top: auto;
  margin-bottom: auto;
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
  height: 60;  
  margin-top: 2%;
  margin-bottom: -3%;
`;

const Estrela = styled(Icon)`
`;

export default ItemServicoPrestadorAndamento;
