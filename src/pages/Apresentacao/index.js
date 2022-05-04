import React from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen';

import construfindLogo from '../../assets/images/ConstrufindLogo.png';
import welcomeImage from '../../assets/images/ImagemBemvindo.png';
import Container from '../../components/Container';

const Apresentacao = ({ navigation, route, options, back }) => {

  SplashScreen.hide();

  return (
    <Container>
        <Image source={construfindLogo} style={styles.logoImg} />

        <Image source={welcomeImage} style={styles.welcomeImg} />

        <Text style={styles.textoPrincipal}>Conectando quem precisa com quem sabe fazer!</Text>
        <Text style={styles.textoSub}>Contratar ou mostrar serviços de forma simples e objetiva.</Text>

        <TouchableOpacity style={styles.btnNext} onPress={() => { navigation.navigate('Login') }}>
            <Text style={styles.btnTexto}>Vamos começar</Text>
            <Icon name="arrowright" size={20} color="#0C0C0C" />
        </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
    logoImg: {
      alignSelf: 'center',
      marginTop: '5%'
    },
    welcomeImg: {
        alignSelf: 'center',
        marginTop: '10%',
    },
    textoPrincipal: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 24,
        color: "#1A1D1E",
        width: '75%',
        fontFamily: 'Poppins-SemiBold',
        marginTop: '10%'
    },
    textoSub: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 16,
        color: "#6A6A6A",
        fontFamily: 'Poppins-Regular',
        width: '60%',
        marginTop: '5%'
    },
    btnNext: {
        backgroundColor: "#F0D22F",
        borderRadius: 12,
        marginHorizontal: 57,
        marginVertical: 32,
        paddingVertical: 16,
        paddingHorizontal: 60,
        flexDirection: 'row',
        alignContent: "center"
    },
    btnTexto: {
        fontSize: 16,
        color: "#0C0C0C",
        fontFamily: 'Poppins-Regular',
        paddingRight: '10%'
    }
})

export default Apresentacao;
