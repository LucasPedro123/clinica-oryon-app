import React, { useState } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../../Services/fireConfig'; // Certifique-se que este caminho está correto
import { sendPasswordResetEmail } from 'firebase/auth';
import * as S from './style';

export function ForgotPass({ navigation }: any) {
    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            navigation.navigate('signin')
            Alert.alert('Sucesso', 'E-mail de redefinição de senha enviado!');
        } catch (error: any) {
            Alert.alert('Erro', error.message);
        }
    };

    return (
        <S.ForgotPassContainer>
            <S.ForgotPassTitle>
                Esqueci a Senha
            </S.ForgotPassTitle>
            <S.ForgotPassDescription>
                Por favor insira seu e-mail para redefinir a senha
            </S.ForgotPassDescription>
            <S.ForgotPassForm>
                <S.ForgotPassLabel >
                    Endereço de E-mail
                </S.ForgotPassLabel>
                <S.ForgotPassInput 
                    placeholder='Insira seu E-mail' 
                    value={email} 
                    onChangeText={setEmail} 
                />
            </S.ForgotPassForm>
            <TouchableOpacity onPress={handleResetPassword}>
                <S.ForgotPassButton>
                    <S.ButtonText>Resetar Senha</S.ButtonText>
                </S.ForgotPassButton>
            </TouchableOpacity>
        </S.ForgotPassContainer>
    );
}
