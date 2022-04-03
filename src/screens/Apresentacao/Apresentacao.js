import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import construfindLogo from '../../assets/construfind-logo.png';
import welcomeImage from '../../assets/welcome-image.png';
import setaDireita from '../../assets/seta-direita.png';

export default function Apresentacao({ navigation }) {
    return <SafeAreaView style={estilos.tela}>
        <ScrollView>
            <Image source={construfindLogo} style={estilos.logo} />
            <Image source={welcomeImage} style={estilos.ImagemWelcome} />
            <Text style={estilos.texto01}>Conectando quem precisa com quem sabe fazer!</Text>
            <Text style={estilos.texto02}>Contratar ou mostrar serviços de forma simples e objetiva.</Text>
            <TouchableOpacity style={estilos.botao} onPress={() => navigation.navigate('Login')}>
                <View style={estilos.textoSeta}>
                    <Text style={estilos.textoBotao}>Vamos começar</Text>
                    <Image source={setaDireita} style={estilos.seta} />
                </View>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
}

const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: '#fffff3',
    },
    logo: {
        alignSelf: 'center',
        marginTop: '3.5%',
    },
    ImagemWelcome: {
        alignSelf: 'center',
        marginTop: '6.7%',
    },
    texto01: {
        alignSelf: "center",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 24,
        color: "#000",
        marginTop: '8%',
        marginHorizontal: '9.3%'
    },
    texto02: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 16,
        color: "#6A6A6A",
        marginTop: '10%',
        marginHorizontal: 35,
    },
    botao: {
        backgroundColor: "#F0D22F",
        borderRadius: 12,
        marginHorizontal: '15%',
        marginVertical: '15%',
        paddingVertical: 16,
        paddingHorizontal: 60,
        flexDirection: 'row',
        alignContent: "center",
        alignSelf: 'center'
    },
    textoSeta: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    textoBotao: {
        fontSize: 16,
        fontWeight: '400',
        color: "#0C0C0C",
    },
    seta: {
        alignSelf: 'center',
        marginLeft: 6.33,
    }
})