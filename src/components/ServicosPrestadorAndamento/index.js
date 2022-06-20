import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, FONTS } from '../../assets/constants';
import ItemServicoPrestadorAndamento from '../ItemServicoPrestadorAndamento';

const HeaderList = () =>{
  return (     
    <TitleAdd>
      <TitleText>Serviços em andamento</TitleText>
    </TitleAdd>
  );
}

const ServicosPrestadorAndamento = ( props ) => {
  return (
    <Container>

      <ServiceList
        data={props.data}
        keyExtractor={(item) => item.id } 
        renderItem={({item}) => <ItemServicoPrestadorAndamento titulo={item.titulo}
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
  align-self: center;
  height: 40%;
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
  height: 50;
  justify-content: center;
  background-color: ${COLORS.background};
`;

export default ServicosPrestadorAndamento;
