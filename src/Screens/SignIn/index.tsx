import { Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Dimensions, ScaledSize } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as S from './style';
import logo from '../../../assets/logoApp.png';
import { useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Services/fireConfig';
import GoogleLogo from '../../../assets/GoogleLogo.png';
import { UserContext } from '../../Context/User.context';
import { STYLE_GUIDE } from '../../Styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTab } from '../../Components/BottomTab';

interface AuthState {
    id: string;
    email: string;
    pass: string;
}

export default function SignIn({ navigation }: any) {
    const [checkIsVisible, setCheckIsVisible] = useState(false);
    const [passIsVisible, setPassIsVisible] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height); // Estado para armazenar a altura do dispositivo
    const context = useContext(UserContext);

    useEffect(() => {
        context?.setNavigation(navigation);

        const checkPersistedAuth = async () => {
            try {
                const authState = await AsyncStorage.getItem('persistedAuth');

                if (authState) {
                    const jsonValue: AuthState = JSON.parse(authState);
                    signInWithEmailAndPassword(auth, jsonValue.email, jsonValue.pass)
                        .then((userCredential) => {
                            const userId = userCredential.user.uid;
                            context?.setUserId(jsonValue.id);
                            navigation.navigate('MainTabs');
                        });
                }
            } catch (error) {
                console.error('Erro ao recuperar o estado de autenticação persistente:', error);
            }
        };

        checkPersistedAuth();
    }, []);

    useEffect(() => {
        setScreenHeight(Dimensions.get('window').height + 30);



    }, []);

    const handleSignIn = () => {
        setLoading(true); // Inicia o carregamento ao iniciar o login
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userId = userCredential.user.uid;
                context?.setUserId(userId);
                navigation.navigate('MainTabs');

                const userInfo = {
                    id: userId,
                    email: email,
                    pass: password
                };

                if (checkIsVisible) {
                    AsyncStorage.setItem('persistedAuth', JSON.stringify(userInfo));
                }

                setEmailError(false);
                setPasswordError(false);
            })
            .catch((error) => {
                console.log("Error", error.code);
                if (error.code === 'auth/invalid-email') {
                    setEmailError(true);
                    setPasswordError(false);
                } else if (error.code === 'auth/wrong-password' || error.code === 'auth/missing-password' || error.code === 'auth/too-many-requests') {
                    setEmailError(false);
                    setPasswordError(true);
                } else {
                    setEmailError(true);
                    setPasswordError(true);
                }
            })
            .finally(() => {
                setLoading(false); // Finaliza o carregamento após o login
            });
    };

    const handleNavigateForSignUp = () => {
        navigation.navigate('signup');
    };

    const handleNavigateForgotPass = () => {
        navigation.navigate('forgotpass');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', height: screenHeight }} keyboardShouldPersistTaps="handled">
            <S.ContainerSignIn >
                <S.LogoContainer>
                    <S.Logo source={logo} />
                </S.LogoContainer>
                <S.Forms>
                    <S.FormTextWrapper>
                        <S.SignInTitle>Olá, bem-vindo(a) de volta!</S.SignInTitle>
                        <S.SignInSubTitle>Complete o Login para continuar.</S.SignInSubTitle>
                    </S.FormTextWrapper>
                    <S.FormsContent>
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

                        <S.ForgotPassView>
                            <S.CheckBoxView>
                                <S.CheckBox onPress={() => setCheckIsVisible(!checkIsVisible)}>
                                    <Text>{checkIsVisible ? <Feather name="check" /> : ''}</Text>
                                </S.CheckBox>
                                <S.CheckBoxText>Lembre-me</S.CheckBoxText>
                            </S.CheckBoxView>
                            <TouchableOpacity onPress={handleNavigateForgotPass}>
                                <S.ForgotPassText>Esqueceu a senha</S.ForgotPassText>
                            </TouchableOpacity>
                        </S.ForgotPassView>
                        <S.FormsButtonView>
                            {loading ? (
                                <S.FormsButtonSpinner>
                                    <ActivityIndicator size="small" color={STYLE_GUIDE.Colors.white} />
                                </S.FormsButtonSpinner>
                            ) : (
                                <S.FormsButton onPress={handleSignIn}>
                                    <S.ButtonText>Login</S.ButtonText>
                                </S.FormsButton>
                            )}
                            <S.DividerView>
                                <S.Divider />
                                <S.DividerText>Ou</S.DividerText>
                                <S.Divider />
                            </S.DividerView>
                            <S.SignUpView>
                                <S.SignUpText>Não tem uma conta?</S.SignUpText>
                                <TouchableOpacity onPress={handleNavigateForSignUp}>
                                    <S.SignUpLink>Registrar</S.SignUpLink>
                                </TouchableOpacity>
                            </S.SignUpView>
                        </S.FormsButtonView>
                    </S.FormsContent>
                </S.Forms>
            </S.ContainerSignIn>
        </ScrollView>
    );
}
