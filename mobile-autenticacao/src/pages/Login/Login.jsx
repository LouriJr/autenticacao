import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import ApiService from "../../Services/ApiService"
import AuthService from '../../Services/AuthService';
import ToastService from '../../Services/ToastService';

export default function Login() {

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
        VerificarLogin();
    }, []);

    async function VerificarLogin() {
        const usuarioEstaLogado = await AuthService.VerificarSeUsuarioEstaLogado();

        if (usuarioEstaLogado) {
            navigation.navigate("Home");
        }
    }

    async function RealizarLogin() {
        try {
            const body = new URLSearchParams({
                email,
                senha,
            });

            const response = await ApiService.Post("/Usuarios/Login", body)
            const token = response.data.token;

            await AuthService.SalvarToken(token);
            navigation.navigate("Home");

        }
        catch (error) {
            if (error.response?.status === 401) {
                ToastService.Error("Erro ao realizar login", "E-mail e/ou senha inválidos!");
                return;
            }
            ToastService.Error("Erro ao realizar login", "Houve um erro no servidor ao realizar o seu login\r\nTente novamente mais tarde.");
        }
    }


    return (
        <View>
            <TextInput
                placeholder="Digite o e-mail"
                value={email}
                onChangeText={(texto) => setEmail(texto)}
            />
            <TextInput
                placeholder="Senha"
                value={senha}
                secureTextEntry={true}
                onChangeText={(texto) => setSenha(texto)}
            />
            <TouchableOpacity onPress={RealizarLogin}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}
