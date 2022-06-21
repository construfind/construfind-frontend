import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, FONTS } from '../../assets/constants';
import ItemServicoPrestador from '../ItemServicoPrestador';

const HeaderList = () =>{
  return (
    <TitleAdd>
      <TitleText>Serviços disponíveis</TitleText>
    </TitleAdd>
  );
}

const ServicosPrestador = ( props ) => {
  return (
    <Container>

      <ServiceList
        data={props.data}
        keyExtractor={(item) => item.id } 
        renderItem={({item}) => <ItemServicoPrestador titulo={item.titulo}
                                             local={item.local}
                                             tipoServico={item.tipoServico}
                                             estado={item.usuarioPrestadorCPF ? "Serviço em andamento" : "Aguardando candidaturas"}
                                             descricao={item.descricao }
                                             idServico={item.id}
                                             loadingAnimation={ (state) => props.loadingAnimation(state)}
                                             refreshData={() => props.refreshDataAfter()}/>}
        ListHeaderComponent={HeaderList}
        onRefresh={ () => props.onRefresh()}
        refreshing={props.refreshing}
        stickyHeaderIndices={[0]}
      />

    </Container>
  );
}

const Container = styled.View`
  width: 90%;
  height: 40%;
  align-self: center;
  border-radius: 20;
`;

const TitleText = styled.Text`
  font-family: ${FONTS.semiBold};
  font-size: 20;
  color: ${COLORS.black};
`;

const ServiceList = styled.FlatList`
  width: 100%;
  align-self: center;
`;

const TitleAdd = styled.View`
  flex-direction: column;
  justify-content: center;
  background-color: ${COLORS.background};
`;

export default ServicosPrestador;
