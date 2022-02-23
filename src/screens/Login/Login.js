import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Login() {
    const [isContratante, setIsContratante] = useState(true);
    const [corBotaoPrestador, setCorBotaoPrestador] = useState('#F0D22F');
    const [corBotaoContratante, setCorBotaoContratante] = useState('#FBFBFB');

    useEffect(() => {
        setCorBotaoContratante(isContratante ? '#FBFBFB' : '#F0D22F');
        setCorBotaoPrestador(isContratante ? '#F0D22F' : '#FBFBFB');
        console.log('USE EFFECT');
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
})