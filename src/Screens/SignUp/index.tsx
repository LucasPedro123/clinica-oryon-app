import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as S from './style';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '../../Services/fireConfig';
import GoogleLogo from '../../../assets/GoogleLogo.png';
import logo from '../../../assets/logoApp.png';
import { UserContext } from '../../Context/User.context';
import { STYLE_GUIDE } from '../../Styles/global';

const db = getFirestore();

export default function SignUp({ navigation }: any) {
    const context = useContext(UserContext);

    const [checkIsVisible, setCheckIsVisible] = useState(false);
    const [passIsVisible, setPassIsVisible] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State to manage loading state

    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height); // Estado para armazenar a altura do dispositivo


    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone: string) => {
        const re = /^[0-9]{10,11}$/;
        return re.test(phone);
    };

    const handleSignUp = async () => {
        const isNameValid = name.trim() !== '';
        const isEmailValid = validateEmail(email);
        const isPhoneValid = validatePhone(phone);
        const isPasswordValid = password.trim() !== '';

        setNameError(!isNameValid);
        setEmailError(!isEmailValid);
        setPhoneError(!isPhoneValid);
        setPasswordError(!isPasswordValid);

        if (!isNameValid || !isEmailValid || !isPhoneValid || !isPasswordValid) {
            setGeneralError('Por favor, verifique seus dados.');
            return;
        }

        try {
            setIsLoading(true); // Start loading spinner

            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            if (signInMethods.length > 0) {
                setEmailError(true);
                setGeneralError('Email já está em uso.');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            await addDoc(collection(db, 'users'), {
                userId,
                name,
                email,
                phone,
                password,
                photoURL
            });

            navigation.navigate('signin');
        } catch (error: any) {
            if (error.code == 'auth/email-already-in-use') {
                setEmailError(true);
            }
            setGeneralError('Erro ao criar conta. Por favor, tente novamente.');
        } finally {
            setIsLoading(false); // Stop loading spinner
        }
    };

    function handleNavigateForSignIn() {
        navigation.navigate('signin');
    }

    useEffect(() => {
        setScreenHeight(Dimensions.get('window').height + 30);



    }, []);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: screenHeight - 5 }} keyboardShouldPersistTaps="handled">
            <S.ContainerSignIn style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} >
                <S.LogoContainer>
                    <S.Logo source={logo} />
                </S.LogoContainer>
                <S.Forms>
                    <S.FormTextWrapper>
                        <S.SignInTitle>Crie a sua conta</S.SignInTitle>
                        <S.SignInSubTitle>Conecte-se para continuar.</S.SignInSubTitle>
                    </S.FormTextWrapper>
                    <S.FormsContent>
                        <S.InputWrapper>
                            <S.InputName>Nome</S.InputName>
                            <S.Input
                                placeholder="Por favor, insira seu nome."
                                value={name}
                                onChangeText={setName}
                                
                                style={{ borderColor: nameError ? STYLE_GUIDE.Colors.alert : STYLE_GUIDE.Colors.borderColor }}
                            />
                        </S.InputWrapper>
                        <S.InputWrapper>
                            <S.InputName>Número de Telefone</S.InputName>
                            <S.Input
                                keyboardType="phone-pad"
                                placeholder="Por favor, insira seu telefone."
                                value={phone}
                                onChangeText={setPhone}
                                maxLength={11}
                                style={{ borderColor: phoneError ? STYLE_GUIDE.Colors.alert : STYLE_GUIDE.Colors.borderColor }}
                            />
                        </S.InputWrapper>
                        <S.InputWrapper>
                            <S.InputName>Email</S.InputName>
                            <S.Input
                                keyboardType="email-address"
                                placeholder="Por favor, insira seu E-mail."
                                value={email}
                                onChangeText={setEmail}
                                style={{ borderColor: emailError ? STYLE_GUIDE.Colors.alert : STYLE_GUIDE.Colors.borderColor }}
                            />
                        </S.InputWrapper>
                        <S.InputWrapper>
                            <S.InputName>Senha</S.InputName>
                            <S.PasswordView style={{ borderColor: passwordError ? STYLE_GUIDE.Colors.alert : STYLE_GUIDE.Colors.borderColor }}>
                                <S.InputPassword
                                    placeholder="Por favor, insira sua senha."
                                    secureTextEntry={passIsVisible}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity onPress={() => setPassIsVisible(!passIsVisible)}>
                                    <Feather name={passIsVisible ? 'eye-off' : 'eye'} size={18} />
                                </TouchableOpacity>
                            </S.PasswordView>
                        </S.InputWrapper>

                        <S.FormsButtonView>
                            <S.FormsButton onPress={handleSignUp} disabled={isLoading} style={{ backgroundColor: isLoading ? '#C2A3D4' : STYLE_GUIDE.Colors.secundary }}>
                                {isLoading ? (
                                    <ActivityIndicator size="small" color={STYLE_GUIDE.Colors.white} />
                                ) : (
                                    <S.ButtonText>Registrar</S.ButtonText>
                                )}
                            </S.FormsButton>
                            <S.DividerView>
                                <S.Divider />
                                <S.DividerText>Ou</S.DividerText>
                                <S.Divider />
                            </S.DividerView>

                            <S.SignUpView>
                                <S.SignUpText>Já possui uma conta?</S.SignUpText>
                                <TouchableOpacity onPress={handleNavigateForSignIn}>
                                    <S.SignUpLink>Login</S.SignUpLink>
                                </TouchableOpacity>
                            </S.SignUpView>
                        </S.FormsButtonView>
                    </S.FormsContent>
                </S.Forms>
            </S.ContainerSignIn>
        </ScrollView>
    );
}
