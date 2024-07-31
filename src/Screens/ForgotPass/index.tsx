import React, { useState } from 'react';
import { Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { auth, db } from '../../Services/fireConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import * as S from './style';
import { STYLE_GUIDE } from '../../Styles/global';

export function ForgotPass({ navigation }: any) {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        setLoading(true); // Inicia o carregamento
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users = querySnapshot.docs.map(doc => doc.data().email);
        try {
            if (users.includes(email)) {
                await sendPasswordResetEmail(auth, email);
                navigation.navigate('signin');
                Alert.alert('Sucesso', 'E-mail de redefinição de senha enviado!');
                setEmailError(false);
            } else {
                setEmailErrorText('E-mail não encontrado. Verifique se o e-mail está correto.');
                setEmailError(true);
            }
        } catch (error: any) {
            setEmailErrorText('Ocorreu um erro ao enviar o e-mail de redefinição de senha. Por favor, tente novamente.');
            setEmailError(true);
        } finally {
            setLoading(false); 
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
                <S.ForgotPassLabel>
                    Endereço de E-mail
                </S.ForgotPassLabel>
                <S.ForgotPassInput
                    placeholder='Insira seu E-mail'
                    value={email}
                    onChangeText={setEmail}
                    style={{ borderColor: emailError ? STYLE_GUIDE.Colors.alert : STYLE_GUIDE.Colors.borderColor }} // Adiciona a borda vermelha se houver erro de email
                />
                {emailError && <S.ErrorMessage>{emailErrorText}</S.ErrorMessage>}
            </S.ForgotPassForm>
            <TouchableOpacity onPress={handleResetPassword} disabled={loading}>
                <S.ForgotPassButton style={{backgroundColor: loading ?  '#C2A3D4' : STYLE_GUIDE.Colors.secundary}}>

                    {loading ? (
                        <ActivityIndicator size="small" color={STYLE_GUIDE.Colors.white} />
                    ) : (
                        <S.ButtonText>Resetar Senha</S.ButtonText>
                    )}
                </S.ForgotPassButton>
            </TouchableOpacity>
        </S.ForgotPassContainer>
    );
}
