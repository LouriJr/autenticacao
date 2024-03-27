import React, { useEffect, useState } from 'react'
import ApiService from '../../Services/ApiService';
import AuthService from '../../Services/AuthService';
import { useNavigate } from "react-router-dom";
import ToastService from '../../Services/ToastService';

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
        VerificarLogin();
    }, []);

    function VerificarLogin() {
        const usuarioEstaLogado = AuthService.VerificarSeUsuarioEstaLogado();
        if (usuarioEstaLogado) {
            navigate("/");
        }
    }

    async function Login() {
        try {

            const body = new URLSearchParams({
                email,
                senha,
            });

            debugger;

            const response = await ApiService.post("/Usuarios/Login", body);
            const token = response.data.token;

            AuthService.SalvarToken(token);

            navigate("/");
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
        <div>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='E-mail' />

            <input
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder='Senha'
                type='Password' />

            <button onClick={Login}>Login</button>
        </div>
    )
}
