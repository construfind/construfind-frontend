import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, FONTS } from '../../assets/constants';
import ItemServico from '../ItemServico';

const ServicosContratante = ( props ) => {
  
  const HeaderList = () =>{
    return (    
      <TitleAdd>
        <TitleText>Seus serviços</TitleText>
        <AddServiceButton onPress={() =>{ props.btnAddService(true) }}>
          <Icon name="plus" size={35} color={COLORS.black} />
        </AddServiceButton>
      </TitleAdd>
    );
  }

  return (
    <Container>

      <ServiceList
        data={props.data}
        keyExtractor={(item) => item.id } 
        renderItem={({item}) => <ItemServico titulo={item.titulo}
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
      />

    </Container>
  );
}

const AddServiceButton = styled.TouchableOpacity`
  border-radius: 20;
  width: 65;
  height: 65;
  right: 0;
  position: absolute;
  background-color: ${COLORS.primary};
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  width: 90%;
  height: 80%;
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
  height: 80;
`;

export default ServicosContratante;
