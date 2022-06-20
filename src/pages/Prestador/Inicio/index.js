import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Pressable, Keyboard, Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useSelector } from 'react-redux';

import { api } from '../../../services/api';
import { Container, WelcomeHeader, ServicosPrestador, ServicosPrestadorAndamento, Loader } from '../../../components';

const Inicio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDataList, setIsLoadingDataList] = useState(false);
  const [dataServicos, setDataServicos] = useState([{}]);

  const [isLoadingDataListAndamento, setIsLoadingDataListAndamento] = useState(false);
  const [dataServicosAndamento, setDataServicosAndamento] = useState([{}]);

  const token = useSelector(({ authenticate: { token } }) => token);
  const { nomeCompleto } = useSelector(({ authenticate: { user } }) => user);

  SplashScreen.hide();
  
  useEffect(() =>{
    handleData();
    handleDataAndamento();  
  },[])

  const handleData = async () => {
    const url = 'api/Servico/service-read';
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

  const handleDataAndamento = async () => {
    const url = 'api/Servico/service-read-user-prestador';
    const config = { headers: { Authorization: `Bearer ${token}` } }
    
    await api
      .get(url, config)
      .then(async ( { data } ) => {
        setDataServicosAndamento(data);
      })
      .catch((err) => {
          console.log("Error Buscar: ", err);
      })
      .finally(() => {setIsLoading(false); setIsLoadingDataListAndamento(false)})
  };

  const refreshData = () => {
    setIsLoadingDataList(true);
    setIsLoading(false);
    handleDataAndamento();
    handleData();
  }

  const refreshDataAndamento = () => {
    setIsLoadingDataListAndamento(true);
    setIsLoading(false);
    handleDataAndamento();
    handleData();
  }

  return (
    <Container>
      <WelcomeHeader nomeUsuario={nomeCompleto}/>
      <ServicosPrestador data={dataServicos}
                         onRefresh={refreshData}
                         refreshing={isLoadingDataList}
                         loadingAnimation={(state) => setIsLoading(state)}
                         refreshDataAfter={() => refreshData()}
                         />

      <ServicosPrestadorAndamento data={dataServicosAndamento}
                                  onRefresh={refreshDataAndamento}
                                  refreshing={isLoadingDataListAndamento}
                                  loadingAnimation={(state) => setIsLoading(state)}
                                  refreshDataAfter={() => refreshDataAndamento()}
                                  /> 

      <Loader loading={isLoading} />
    </Container>
  )
};

export default Inicio;
