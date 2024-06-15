import { Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as S from './style';
import logo from '../../../assets/logoApp.png';
import { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Services/fireConfig';
import GoogleLogo from '../../../assets/GoogleLogo.png';
import { UserContext } from '../../Context/User.context';

export default function SignIn({ navigation }: any) {
    const [checkIsVisible, setCheckIsVisible] = useState(false);
    const [passIsVisible, setPassIsVisible] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(UserContext);

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userId = userCredential.user.uid;
                console.log(userId); 
                context?.setUserId(userId);
                Alert.alert('Login bem-sucedido', 'Bem-vindo de volta!');
                navigation.navigate('home');
            })
            .catch((error) => {
                Alert.alert('Erro ao fazer login', error.message);
            });
    };

    const handleNavigateForSignUp = () => {
        navigation.navigate('signup');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <S.ContainerSignIn>
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
                            />
                        </S.InputWrapper>
                        <S.InputWrapper>
                            <S.InputName>Senha</S.InputName>
                            <S.PasswordView>
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
                            <TouchableOpacity>
                                <S.ForgotPassText>Esqueceu a senha</S.ForgotPassText>
                            </TouchableOpacity>
                        </S.ForgotPassView>
                        <S.FormsButtonView>
                            <S.FormsButton onPress={handleSignIn}>
                                <S.ButtonText>Login</S.ButtonText>
                            </S.FormsButton>
                            <S.DividerView>
                                <S.Divider />
                                <S.DividerText>Ou com</S.DividerText>
                                <S.Divider />
                            </S.DividerView>
                            <S.GoogleAuthView>
                                <S.GoogleAuthLogo source={GoogleLogo} />
                                <S.GoogleAuthText>Google</S.GoogleAuthText>
                            </S.GoogleAuthView>
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