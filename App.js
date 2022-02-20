import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text } from 'react-native';

import construfindLogo from './src/assets/construfind-logo.png';
import welcomeImage from './src/assets/welcome-image.png';

function App() {
  return <SafeAreaView style={estilos.tela}>
    <Image source={construfindLogo} style={estilos.logo} />
    <Image source={welcomeImage} style={estilos.ImagemWelcome} />
    <Text style={estilos.texto01}>Conectando quem precisa com quem sabe fazer!</Text>
  </SafeAreaView>
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
  },
  ImagemWelcome: {
    alignSelf: 'center',
    marginTop: 35,
  },
  texto01: {
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: "#000",
    marginTop: 30,
    marginLeft: 35,
    marginRight: 35,
  }
})

export default App;
