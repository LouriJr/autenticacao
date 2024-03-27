import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import AuthService from '../../Services/AuthService';

export default function Home() {
    const navigation = useNavigation();

    useEffect(() => {
        VerificarLogin();
    }, []);

    async function VerificarLogin() {
        const usuarioEstaLogado = await AuthService.VerificarSeUsuarioEstaLogado();

        if (!usuarioEstaLogado) {
            navigation.navigate("Login");
        }
    }
    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}
