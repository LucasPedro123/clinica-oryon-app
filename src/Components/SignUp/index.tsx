import { ScrollView, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

// Style
import * as S from './style';
// Images
import logo from '../../../assets/logoClinicaOryon.png'

// Hooks
import { useState } from 'react';

export default function SignIn({ navigation }: any) {

    const [checkIsVisible, setCheckIsVisible] = useState(false)
    const [passIsVisible, setPassIsVisible] = useState(false);

    function handeleNavigateForSignUp() {
        navigation.navigate('signin')
    }

    return (

        <ScrollView>
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
                            <S.InputName>Nome</S.InputName>
                            <S.Input placeholder='Por favor, insira seu nome.' />
                        </S.InputWrapper>
                        <S.InputWrapper>
                            <S.InputName >Número de Telefone</S.InputName>
                            <S.Input keyboardType='phone-pad' placeholder='Por favor, insira seu telefone.' />
                        </S.InputWrapper>
                        <S.InputWrapper>
                            <S.InputName>Email</S.InputName>
                            <S.Input keyboardType='email-address' placeholder='Por favor, insira seu E-mail.' />
                        </S.InputWrapper>
                        <S.InputWrapper>
                            <S.InputName>Senha</S.InputName>
                            <S.PasswordView>
                                <S.InputPassword placeholder='Por favor, insira sua senha.' secureTextEntry={passIsVisible} />

                                <TouchableOpacity onPress={() => setPassIsVisible(!passIsVisible)}>
                                    <Feather
                                        name={passIsVisible ? 'eye-off' : 'eye'}
                                        size={18}
                                    />
                                </TouchableOpacity>
                            </S.PasswordView>
                        </S.InputWrapper>
                        <S.ForgotPassView >
                            <S.CheckBoxView>
                                <S.CheckBox onPress={() => { setCheckIsVisible(!checkIsVisible) }}>
                                    <Text>
                                        {checkIsVisible ? <Feather name='check' /> : ''}
                                    </Text>
                                </S.CheckBox>
                                <S.CheckBoxText>Lembre-me</S.CheckBoxText>
                            </S.CheckBoxView>
                        </S.ForgotPassView>
                        <S.FormsButtonView>
                            <S.FormsButton>
                                <S.ButtonText>Registrar</S.ButtonText>
                            </S.FormsButton>
                            <S.DividerView>
                                <S.Divider></S.Divider>
                                <S.DividerText>Ou com</S.DividerText>
                                <S.Divider></S.Divider>
                            </S.DividerView>
                            <S.GoogleAuthView>

                            </S.GoogleAuthView>
                            <S.SignUpView>
                                <S.SignUpText>Já possui uma conta?</S.SignUpText>
                                <TouchableOpacity onPress={() => { handeleNavigateForSignUp() }}>
                                    <S.SignUpLink>Login</S.SignUpLink>
                                </TouchableOpacity>
                            </S.SignUpView>
                        </S.FormsButtonView>
                    </S.FormsContent>
                </S.Forms>
            </S.ContainerSignIn>
        </ScrollView>
    )
}
