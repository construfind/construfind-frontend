import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import cpfLogin from '../../assets/cpf-login.png';
import senhaLogin from '../../assets/senha-login.png';
import construfindFooter from '../../assets/construfind-footer.png';

export default function Login({ navigation }) {
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
            <TouchableOpacity>
                <Text style={estilos.esqueci}>Esqueci minha senha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.botao} onPress={() => { }}>
                <Text style={estilos.textoBotao}>ENTRAR</Text>
            </TouchableOpacity>
            <View style={estilos.criarConta}>
                <Text style={estilos.textoNovoUsuario}>Novo usuário?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={estilos.textoCrieSuaConta}>Crie sua Conta</Text>
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
        marginTop: '10%',
        marginLeft: 35,
        marginRight: 35,
    },
    texto02: {
        alignSelf: "center",
        textAlign: "center",
        fontWeight: "400",
        fontSize: 16,
        color: "#6A6A6A",
        marginTop: '20%',
        marginHorizontal: 35,
        marginBottom: 20,
    },
    campo: {
        height: 52,
        backgroundColor: "#FFF",
        fontSize: 20,
        borderRadius: 12,
        width: 250,
    },
    campo01: {
        flexDirection: "row",
        height: 54,
        lineHeight: 20,
        marginHorizontal: '10%',
        marginBottom: 10,
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
        textAlign: "right",
        fontWeight: "400",
        fontSize: 16,
        color: "#6A6A6A",
        marginTop: 5,
        marginHorizontal: '10%',
        marginBottom: 20,
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
        marginTop: '37%',
    },
})