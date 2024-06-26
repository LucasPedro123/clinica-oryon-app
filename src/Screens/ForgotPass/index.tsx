import React, { useState } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../../Services/fireConfig';
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import * as S from './style';
import { STYLE_GUIDE } from '../../Styles/global';

export function ForgotPass({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            navigation.navigate('signin');
            Alert.alert('Sucesso', 'E-mail de redefinição de senha enviado!');
        } catch (error: any) {
            setEmailError(true);
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
                    style={{ borderColor: emailError == true ? STYLE_GUIDE.Colors.alert : STYLE_GUIDE.Colors.borderColor }} // Adiciona a borda vermelha se houver erro de email
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
