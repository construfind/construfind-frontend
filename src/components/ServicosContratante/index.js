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

const Container = styled.View`
  width: 90%;
  align-self: center;
  height: 80%;
`;

const TitleText = styled.Text`
  font-family: ${FONTS.semiBold};
  font-size: 20;
  color: ${COLORS.black};
`;

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

const Item = styled.Text`
  font-size: 20;
`;

const ServiceList = styled.FlatList`
  width: 100%;
  align-self: center;
`;

const TitleAdd = styled.View`
  flex-direction: column;
  height: 68;
  justify-content: center;
  background-color: ${COLORS.background};
`;

export default ServicosContratante;
