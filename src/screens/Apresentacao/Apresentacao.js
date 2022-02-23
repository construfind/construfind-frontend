import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import construfindLogo from '../../assets/construfind-logo.png';
import welcomeImage from '../../assets/welcome-image.png';
import setaDireita from '../../assets/seta-direita.png';

export default function Apresentacao() {
    return <SafeAreaView style={estilos.tela}>
        <ScrollView>
            <Image source={construfindLogo} style={estilos.logo} />
            <Image source={welcomeImage} style={estilos.ImagemWelcome} />
            <Text style={estilos.texto01}>Conectando quem precisa com quem sabe fazer!</Text>
            <Text style={estilos.texto02}>Contratar ou mostrar serviços de forma simples e objetiva.</Text>
            <TouchableOpacity style={estilos.botao} onPress={() => { }}>
                <Text style={estilos.textoBotao}>Vamos começar</Text>
                <Image source={setaDireita} style={estilos.seta} />
            </TouchableOpacity>
        </ScrollView>
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
    },
    texto02: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 16,
        color: "#6A6A6A",
        marginTop: 30,
        marginHorizontal: 35,
    },
    botao: {
        backgroundColor: "#F0D22F",
        borderRadius: 12,
        marginHorizontal: 57,
        marginVertical: 32,
        paddingVertical: 16,
        paddingHorizontal: 60,
        flexDirection: 'row',
        alignContent: "center"
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