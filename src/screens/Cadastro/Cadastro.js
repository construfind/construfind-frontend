import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import cpfLogin from '../../assets/cpf-login.png';
import senhaLogin from '../../assets/senha-login.png';
import construfindFooter from '../../assets/construfind-footer.png';
import chevronEsquerda from '../../assets/chevron-esquerda.png';
import userIcon from '../../assets/user-icon.png';
import smartPhoneIcon from '../../assets/smartphone-icon.png';
import phoneIcon from '../../assets/phone-icon.png';
import elipseYellowIcon from '../../assets/elipse-yellow-icon.png';
import elipseGrayIcon from '../../assets/elipse-gray-icon.png';

export default function Cadastro({ navigation }) {
    const [isContratante, setIsContratante] = useState(true);
    const [corBotaoPrestador, setCorBotaoPrestador] = useState(elipseYellowIcon);
    const [corBotaoContratante, setCorBotaoContratante] = useState(elipseGrayIcon);

    useEffect(() => {
        setCorBotaoContratante(isContratante ? elipseGrayIcon : elipseYellowIcon);
        setCorBotaoPrestador(isContratante ? elipseYellowIcon : elipseGrayIcon);
    }, [isContratante]);

    return <SafeAreaView style={estilos.tela}>
        <ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Image source={chevronEsquerda} style={estilos.chevron} />
            </TouchableOpacity>
            <Text style={estilos.texto01}>Cadastro</Text>
            <View style={estilos.campo01}>
                <Image source={userIcon} style={estilos.imagem} />
                <TextInput style={estilos.campo} selectTextOnFocus />
            </View>
            <View style={estilos.campo01}>
                <Image source={cpfLogin} style={estilos.imagem} />
                <TextInput style={estilos.campo} selectTextOnFocus />
            </View>
            <View style={estilos.campo01}>
                <Image source={senhaLogin} style={estilos.imagem} />
                <TextInput style={estilos.campo} selectTextOnFocus />
            </View>
            <View style={estilos.campo01}>
                <Image source={senhaLogin} style={estilos.imagem} />
                <TextInput style={estilos.campo} selectTextOnFocus />
            </View>
            <View style={estilos.campo01}>
                <Image source={smartPhoneIcon} style={estilos.imagem} />
                <TextInput style={estilos.campo} selectTextOnFocus />
            </View>
            <View style={estilos.campo01}>
                <Image source={phoneIcon} style={estilos.imagem} />
                <TextInput style={estilos.campo} selectTextOnFocus />
            </View>
            <Text style={estilos.esqueci}>Escolha o tipo de cadastro:</Text>
            <TouchableOpacity style={estilos.tipo} onPress={() => setIsContratante(true)}>
                <Image source={corBotaoPrestador} style={estilos.elipse} />
                <Text style={estilos.prestadorContratante}>Prestador de Serviços</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.tipo} onPress={() => setIsContratante(false)}>
                <Image source={corBotaoContratante} style={estilos.elipse} />
                <Text style={estilos.prestadorContratante}>Contratante de Serviços</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.botao} onPress={() => { }}>
                <Text style={estilos.textoBotao}>CADASTRE-SE</Text>
            </TouchableOpacity>
            <View style={estilos.criarConta}>
                <Text style={estilos.textoNovoUsuario}>Ja possui uma conta?</Text>
                <TouchableOpacity>
                    <Text style={estilos.textoCrieSuaConta}>Entrar</Text>
                </TouchableOpacity>
            </View>
            <Image source={construfindFooter} style={estilos.logoFooter} />
        </ScrollView>
    </SafeAreaView >
}

const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: '#fffff3',
    },
    chevron: {
        marginTop: '5%',
        marginLeft: '5%',
    },
    texto01: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#000",
        marginTop: '4.8%',
        marginHorizontal: '10%',
        marginBottom: '1.7%'
    },
    campo: {
        height: 52,
        backgroundColor: "#FFF",
        fontSize: 20,
        borderRadius: 12,
        width: 240,
    },
    campo01: {
        flexDirection: "row",
        height: 54,
        lineHeight: 20,
        marginHorizontal: '10%',
        marginBottom: '3%',
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "#6A6A6A",
        backgroundColor: "#FFF",
    },
    imagem: {
        alignSelf: "center",
        marginLeft: 16,
        marginRight: 14,
    },
    esqueci: {
        textAlign: "center",
        fontWeight: "400",
        fontSize: 16,
        color: "#6A6A6A",
        marginTop: 5,
        marginHorizontal: '10%',
        marginBottom: 20,
    },
    tipo: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    elipse: {
        alignSelf: 'center',
        marginRight: '1%'
    },
    prestadorContratante: {
        textAlign: "center",
        fontWeight: "400",
        fontSize: 16,
        color: "#6A6A6A",
        marginTop: '1%',
        paddingBottom: 7,
    },
    botao: {
        backgroundColor: "#F0D23F",
        borderRadius: 12,
        marginHorizontal: 20,
        marginVertical: 20,
        paddingVertical: 16,
        paddingHorizontal: 125,
        flexDirection: 'row',
        alignContent: "center",
        alignSelf: 'center'
    },
    textoBotao: {
        fontSize: 16,
        fontWeight: '600',
        color: "#0C0C0C",
        alignSelf: 'center'
    },
    criarConta: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 10,
    },
    textoNovoUsuario: {
        marginRight: 5,
        color: "#000",
        fontWeight: 'bold',
    },
    textoCrieSuaConta: {
        fontWeight: 'bold',
        color: "#F0D23F",
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: -1 },
        textShadowRadius: 1
    },
    logoFooter: {
        alignSelf: 'center',
        marginTop: '4%',
    },
})