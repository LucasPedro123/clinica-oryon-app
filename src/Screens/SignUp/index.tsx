import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Pressable, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as S from './style';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '../../Services/fireConfig';
import logo from '../../../assets/logoApp.png';
import { UserContext } from '../../Context/User.context';
import { STYLE_GUIDE } from '../../Styles/global';

const db = getFirestore();

export default function SignUp({ navigation }: any) {
    const context = useContext(UserContext);

    const [passIsVisible, setPassIsVisible] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [birthDate, setBirthDate] = useState<Date | null>(null); // State to store birth date
    const [showDatePicker, setShowDatePicker] = useState(false); // State to control date picker visibility

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State to manage loading state

    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height); // State to store device height

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
        const isBirthDateValid = birthDate !== null; // Check if birth date is selected

        setNameError(!isNameValid);
        setEmailError(!isEmailValid);
        setPhoneError(!isPhoneValid);
        setPasswordError(!isPasswordValid);
        setBirthDateError(!isBirthDateValid);

        if (!isNameValid || !isEmailValid || !isPhoneValid || !isPasswordValid || !isBirthDateValid) {
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
                photoURL,
                birthDate: birthDate?.toISOString() // Save birth date in Firestore
            });

            navigation.navigate('signin');
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                setEmailError(true);
            }
            setGeneralError('Erro ao criar conta. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigateForSignIn = () => {
        navigation.navigate('signin');
    };

    const handleDateChange = (selectedDate: Date | undefined) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setBirthDate(selectedDate);
        }
    };

    useEffect(() => {
        const updateScreenHeight = () => {
            setScreenHeight(Dimensions.get('window').height + 30);
        };
        Dimensions.addEventListener('change', updateScreenHeight);
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
                            <S.InputName>Data de Nascimento</S.InputName>
                            <Pressable onPress={() => setShowDatePicker(true)}>
                                <S.Input
                                    placeholder="Selecione sua data de nascimento"
                                    value={birthDate ? birthDate.toLocaleDateString() : ''}
                                    editable={false}
                                    style={{ borderColor: birthDateError ? STYLE_GUIDE.Colors.alert : STYLE_GUIDE.Colors.borderColor, color: birthDate ? 'black' : '#9e9e9e' }}
                                />
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={showDatePicker}
                                mode="date"
                                date={birthDate || new Date()}
                                onConfirm={handleDateChange}
                                onCancel={() => setShowDatePicker(false)}
                                maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 12))}
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
