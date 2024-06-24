import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as S from './style';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '../../Services/fireConfig';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import GoogleLogo from '../../../assets/GoogleLogo.png';
import logo from '../../../assets/logoApp.png';
import { UserContext } from '../../Context/User.context';
import { STYLE_GUIDE } from '../../Styles/global';

WebBrowser.maybeCompleteAuthSession();

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

    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<any>(null);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: process.env.CLIENT_ID,
        iosClientId: process.env.IOS_CLIENT_ID,
        androidClientId: process.env.ANDROID_CLIENT_ID,
        redirectUri: makeRedirectUri({
            native: 'com.lucaspedrof.clinicaoryon:/oauthredirect',
        }),
    });

    function handleNavigateForSignIn() {
        navigation.navigate('signin');
    }

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);

            signInWithCredential(auth, credential)
                .then((userCredential) => {
                    setUser(userCredential.user);
                    Alert.alert('Login bem-sucedido', 'Bem-vindo!');
                    navigation.navigate('home');
                })
                .catch((error) => {
                    Alert.alert('Erro ao fazer login com Google', error.message);
                });
        }
    }, [response]);

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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            context?.setUserId(userId);

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
            Alert.alert('Erro ao registrar', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <S.ContainerSignIn>
                <S.LogoContainer>
                    <S.Logo source={logo} />
                </S.LogoContainer>
                <S.Forms>
                    <S.FormTextWrapper>
                        <S.SignInTitle>Olá, bem-vindo(a)!</S.SignInTitle>
                        <S.SignInSubTitle>Complete o registro para continuar.</S.SignInSubTitle>
                    </S.FormTextWrapper>
                    <S.FormsContent>
                        <ScrollView>
                            <S.InputWrapper>
                                <S.InputName>Nome</S.InputName>
                                <S.Input
                                    placeholder="Por favor, insira seu nome."
                                    value={name}
                                    onChangeText={setName}
                                    style={{ borderColor: nameError ? 'red' : STYLE_GUIDE.Colors.borderColor }}
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
                                    style={{ borderColor: phoneError ? 'red' : STYLE_GUIDE.Colors.borderColor }}
                                />
                            </S.InputWrapper>
                            <S.InputWrapper>
                                <S.InputName>Email</S.InputName>
                                <S.Input
                                    keyboardType="email-address"
                                    placeholder="Por favor, insira seu E-mail."
                                    value={email}
                                    onChangeText={setEmail}
                                    style={{ borderColor: emailError ? 'red' : STYLE_GUIDE.Colors.borderColor }}
                                />
                            </S.InputWrapper>
                            <S.InputWrapper>
                                <S.InputName>Senha</S.InputName>
                                <S.PasswordView style={{ borderColor: passwordError ? 'red' : STYLE_GUIDE.Colors.borderColor }}>
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
                            <S.ForgotPassView>
                                <S.CheckBoxView>
                                    <S.CheckBox onPress={() => setCheckIsVisible(!checkIsVisible)}>
                                        <Text>{checkIsVisible ? <Feather name="check" /> : ''}</Text>
                                    </S.CheckBox>
                                    <S.CheckBoxText>Lembre-me</S.CheckBoxText>
                                </S.CheckBoxView>
                            </S.ForgotPassView>
                            <S.FormsButtonView>
                                <S.FormsButton onPress={handleSignUp}>
                                    <S.ButtonText>Registrar</S.ButtonText>
                                </S.FormsButton>
                                <S.DividerView>
                                    <S.Divider />
                                    <S.DividerText>Ou com</S.DividerText>
                                    <S.Divider />
                                </S.DividerView>
                                <TouchableOpacity onPress={() => promptAsync()}>
                                    <S.GoogleAuthView>
                                        <S.GoogleAuthLogo source={GoogleLogo} />
                                        <S.GoogleAuthText>Google</S.GoogleAuthText>
                                    </S.GoogleAuthView>
                                </TouchableOpacity>
                                <S.SignUpView>
                                    <S.SignUpText>Já possui uma conta?</S.SignUpText>
                                    <TouchableOpacity onPress={handleNavigateForSignIn}>
                                        <S.SignUpLink>Login</S.SignUpLink>
                                    </TouchableOpacity>
                                </S.SignUpView>
                            </S.FormsButtonView>
                        </ScrollView>
                    </S.FormsContent>
                </S.Forms>
            </S.ContainerSignIn>
        </ScrollView>
    );
}
