import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import cpfLogin from '../../assets/cpf-login.png';
import senhaLogin from '../../assets/senha-login.png';

export default function Login() {
    const [isContratante, setIsContratante] = useState(true);
    const [corBotaoPrestador, setCorBotaoPrestador] = useState('#F0D22F');
    const [corBotaoContratante, setCorBotaoContratante] = useState('#FBFBFB');

    useEffect(() => {
        setCorBotaoContratante(isContratante ? '#FBFBFB' : '#F0D22F');
        setCorBotaoPrestador(isContratante ? '#F0D22F' : '#FBFBFB');
    }, [isContratante]);

    return <SafeAreaView style={estilos.tela}>
        <ScrollView>
            <View style={estilos.botoesPrestadorContratante}>
                <TouchableOpacity
                    style={[estilos.botaoPrestador, { backgroundColor: corBotaoPrestador }]}
                    onPress={() => setIsContratante(false)}
                >
                    <Text style={estilos.texto}>PRESTADOR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[estilos.botaoContratante, { backgroundColor: corBotaoContratante }]}
                    onPress={() => setIsContratante(true)}
                >
                    <Text style={estilos.texto}>CONTRATANTE</Text>
                </TouchableOpacity>
            </View>
            <Text style={estilos.texto01}>Bem-vindo!</Text>
            <Text style={estilos.texto02}>LOGIN</Text>
            <View style={estilos.campo01}>
                <Image source={cpfLogin} style={estilos.imagem} />
                <TextInput style={estilos.campo} selectTextOnFocus />
            </View>
            <View style={estilos.campo01}>
                <Image source={senhaLogin} style={estilos.imagem} />
                <TextInput style={estilos.campo} selectTextOnFocus />
            </View>
            <Text style={estilos.texto02}>Esqueci minha senha</Text>
        </ScrollView>
    </SafeAreaView >
}

const estilos = StyleSheet.create({
    tela: {
        flex: 1,
    },
    botoesPrestadorContratante: {
        flexDirection: 'row',
        height: 50,
    },
    botaoPrestador: {
        width: '50%',
    },
    botaoContratante: {
        width: '50%',
    },
    texto: {
        color: "#000",
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: "600",
        lineHeight: 24,
        flex: 1,
    },
    texto01: {
        alignSelf: "center",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
        color: "#000",
        marginTop: 30,
        marginLeft: 35,
        marginRight: 35,
    },
    texto02: {
        alignSelf: "center",
        textAlign: "center",
        fontWeight: "400",
        fontSize: 16,
        color: "#6A6A6A",
        marginTop: 30,
        marginHorizontal: 35,
        marginBottom: 20,
    },
    campo: {
        height: 52,
        backgroundColor: "#FFF",
        fontSize: 20,
        borderRadius: 12
    },
    campo01: {
        flexDirection: "row",
        height: 54,
        lineHeight: 20,
        marginHorizontal: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "#000",
    },
    imagem: {
        alignSelf: "center",
        marginLeft: 16,
        marginRight: 14,
    }
})