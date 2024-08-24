import React, { useContext, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STYLE_GUIDE } from '../../../../Styles/global';
import * as S from './style';
import { UserContext } from '../../../../Context/User.context';
import { db } from '../../../../Services/fireConfig'; // Adjust as needed

const auth = getAuth();

export const ConfigLoginScreen: React.FC = ({ navigation }: any) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [currentPassError, setCurrentPassError] = useState<string | null>(null);
    const [passIsVisible, setPassIsVisible] = useState(true);
    const [passIsVisible2, setPassIsVisible2] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isCurrentPasswordVerified, setIsCurrentPasswordVerified] = useState(false);
    const [btnTitle, setBtnTitle] = useState('Verificar');

    const handleNavigateForgotPass = () => {
        navigation.navigate('forgotpass');
    };

    const handleNavigateHome = () => {
        navigation.navigate('MainTabs');
    };

    const context = useContext(UserContext);

    const handlePasswordBtn = async () => {
        if (btnTitle === 'Verificar') {
            await handleVerifyCurrentPassword();
        } else {
            await handlePasswordReset();
        }
    };

    const handleVerifyCurrentPassword = async () => {
        setLoading(true);
        setCurrentPassError(null);
        try {
            if (context?.User.password === currentPassword) {
                console.log(context.User)
                setBtnTitle('Redefinir Senha');
                setIsCurrentPasswordVerified(true);
            } else {
                setCurrentPassError('Senha atual incorreta.');
                setIsCurrentPasswordVerified(false);
            }
        } catch (error) {
            console.error(error);
            setCurrentPassError('Erro ao verificar a senha.');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (newPassword !== confirmNewPassword) {
            setCurrentPassError('As senhas não coincidem.');
            return;
        }

        setLoading(true);
        setCurrentPassError(null);
        const user = auth.currentUser;
        try {
            const userData = await AsyncStorage.getItem('user');
            console.log(context?.User)
            if (user && user.email) {
                // Update the password in AsyncStorage
                if (userData) {
                    console.log(userData)
                    const parsedData = JSON.parse(userData);
                    parsedData.pass = newPassword;
                    await AsyncStorage.setItem('user', JSON.stringify(parsedData));
                }
                // Update the user's document in Firestore
                const userDoc = doc(db, 'users', context?.User.firestoreId);
                await updateDoc(userDoc, { password: newPassword });


                // Reauthenticate the user
                const credential = EmailAuthProvider.credential(user.email, currentPassword);
                await reauthenticateWithCredential(user, credential);

                // Update the password in Firebase Auth
                await updatePassword(user, newPassword);



                Alert.alert('Sucesso', 'Senha alterada com sucesso!');
                handleNavigateHome();
            }
        } catch (error: any) {
            console.error(error);

            if (error.code === 'auth/wrong-password') {
                setCurrentPassError('Senha atual incorreta.');
            } else if (error.code === 'auth/requires-recent-login') {
                setCurrentPassError('Por favor, faça login novamente e tente novamente.');
            } else {
                setCurrentPassError('Erro ao atualizar a senha.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <S.Container>
            <S.Title>Configuração de Login</S.Title>

            <S.InputWrapper style={{ opacity: isCurrentPasswordVerified ? 0.4 : 1 }} pointerEvents={isCurrentPasswordVerified ? 'none' : 'auto'}>
                <S.InputName>Senha Atual</S.InputName>
                <S.PasswordView style={{ borderColor: currentPassError ? STYLE_GUIDE.Colors.alert : STYLE_GUIDE.Colors.borderColor }}>
                    <S.InputPassword
                        placeholder="****************"
                        secureTextEntry={passIsVisible}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                    />
                    <TouchableOpacity onPress={() => setPassIsVisible(!passIsVisible)}>
                        <Feather name={passIsVisible ? 'eye-off' : 'eye'} size={18} />
                    </TouchableOpacity>
                </S.PasswordView>

                <S.ForgotPassBtn onPress={handleNavigateForgotPass}>
                    <S.TextForgotPass>Esqueceu a senha</S.TextForgotPass>
                </S.ForgotPassBtn>
            </S.InputWrapper>

            {currentPassError && <S.MessageText>{currentPassError}</S.MessageText>}
            <S.Wrapper>
                <S.InputWrapper style={{ opacity: isCurrentPasswordVerified ? 1 : 0.4 }} pointerEvents={isCurrentPasswordVerified ? 'auto' : 'none'}>
                    <S.InputName>Senha Nova</S.InputName>
                    <S.PasswordView style={{ borderColor: STYLE_GUIDE.Colors.borderColor }}>
                        <S.InputPassword
                            placeholder="****************"
                            secureTextEntry={passIsVisible2}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TouchableOpacity onPress={() => setPassIsVisible2(!passIsVisible2)}>
                            <Feather name={passIsVisible2 ? 'eye-off' : 'eye'} size={18} />
                        </TouchableOpacity>
                    </S.PasswordView>
                </S.InputWrapper>

                <S.InputWrapper style={{ opacity: isCurrentPasswordVerified ? 1 : 0.4 }} pointerEvents={isCurrentPasswordVerified ? 'auto' : 'none'}>
                    <S.InputName>Confirme Senha</S.InputName>
                    <S.Input
                        placeholder="****************"
                        secureTextEntry={true}
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                        style={{ borderColor: STYLE_GUIDE.Colors.borderColor }}
                    />
                </S.InputWrapper>

                {loading ? (
                    <S.FormsButtonSpinner>
                        <ActivityIndicator size="small" color={STYLE_GUIDE.Colors.white} />
                    </S.FormsButtonSpinner>
                ) : (
                    <S.FormsButton onPress={handlePasswordBtn}>
                        <S.ButtonText>{btnTitle}</S.ButtonText>
                    </S.FormsButton>
                )}
            </S.Wrapper>
        </S.Container>
    );
};
