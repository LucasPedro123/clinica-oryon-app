import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Platform, Pressable, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as S from './style';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { auth } from '../../Services/fireConfig';
import logo from '../../../assets/logoApp.png';
import axios from 'axios'; // Import axios for API request
import { UserContext } from '../../Context/User.context';
import { STYLE_GUIDE } from '../../Styles/global';

const db = getFirestore();

export default function SignUp({ navigation }: any) {
    const context = useContext(UserContext);

    const [passIsVisible, setPassIsVisible] = useState(true);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
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
    const [phoneFormated, setphoneFormated] = useState(''); // State to manage loading state

    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height); // State to store device height

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone: string) => {
        const re = /^\(\d{2}\) \d{5}-\d{4}$/;
        return re.test(phone);
    };

    const formatPhoneNumber = (phoneNumber: string) => {
        const cleaned = phoneNumber.replace(/\D/g, '');
        let formattedPhoneNumber = phoneNumber;

        if (cleaned.length === 11) {
            formattedPhoneNumber = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 13)}`;
        }

        setPhone(formattedPhoneNumber);
    };



    const verifyEmail = async (email: string) => {
        try {
            const response = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=e5acd40e421ecda5fd71ccf9426e50c17e19a536`);
            return response.data.data.status === 'valid';
        } catch (error) {
            console.error('Erro ao verificar email:', error);
            return false;
        }
    };

    const handleSignUp = async () => {
        const isNameValid = name.trim() !== '';
        const isEmailValid = validateEmail(email);
        const isPhoneValid = validatePhone(phone);
        const isPasswordValid = password.trim() !== '';
        const isBirthDateValid = birthDate !== null;

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
            setIsLoading(true);

            const isEmailExist = await verifyEmail(email);
            if (!isEmailExist) {
                setEmailError(true);
                setGeneralError('Email não existe ou é inválido.');
                return;
            }
            setEmailError(false);
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            if (signInMethods.length > 0) {
                setEmailError(true);
                setGeneralError('Email já está em uso.');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            const userDocRef = await addDoc(collection(db, 'users'), {
                userId,
                name,
                surname,
                email,
                phone: phone.replace(/\D/g, ''),
                password,
                photoURL,
                birthDate: birthDate?.toISOString()
            });

            const firestoreId = userDocRef.id;

            await updateDoc(userDocRef, { firestoreId });

            context?.setUser({
                userId,
                firestoreId,
                name,
                surname,
                email,
                phone: phone.replace(/\D/g, ''),
                password,
                photoURL,
                birthDate: birthDate?.toISOString(),
            });

            navigation.navigate('signin');
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                setEmailError(true);
                setGeneralError('Email já está em uso.');
            } else if (error.code === "auth/weak-password") {
                setGeneralError('Senha fraca');
            }
            console.log(error.code);
        } finally {
            setIsLoading(false);
        }
    };


    const handleNavigateForSignIn = () => {
        navigation.navigate('signin');
    };

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(Platform.OS === 'ios');
        setBirthDate(currentDate);
    };

    useEffect(() => {
        const updateScreenHeight = () => {
            setScreenHeight(Dimensions.get('window').height + 30);
        };
        Dimensions.addEventListener('change', updateScreenHeight);
    }, []);

    return (
        <ScrollView contentContainerStyle={{paddingTop: '20%'}}  keyboardShouldPersistTaps="handled">
            <S.ContainerSignIn style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                <S.LogoContainer>
                    <S.Logo source={logo} />
                </S.LogoContainer>
                <S.Forms>
                    <S.FormTextWrapper>
                        <S.SignInTitle>Crie a sua conta</S.SignInTitle>
                        <S.SignInSubTitle>Conecte-se para continuar.</S.SignInSubTitle>
                    </S.FormTextWrapper>
                    <S.FormsContent>
                        <S.InputView>
                            <S.InputContent>
                                <S.InputName>Nome</S.InputName>
                                <S.InputUserName
                                    placeholder="Insira o nome"
                                    value={name}
                                    maxLength={16}
                                    onChangeText={setName}
                                    style={{ borderColor: nameError ? STYLE_GUIDE.Colors.alert : STYLE_GUIDE.Colors.borderColor }}
                                />
                            </S.InputContent>
                            <S.InputContent>
                                <S.InputName>Sobrenome</S.InputName>
                                <S.InputUserName
                                    placeholder="Insira o sobrenome"
                                    value={surname}
                                    maxLength={30}
                                    onChangeText={setSurname}
                                    style={{ borderColor: nameError ? STYLE_GUIDE.Colors.alert : STYLE_GUIDE.Colors.borderColor }}
                                />
                            </S.InputContent>
                        </S.InputView>
                        <S.InputWrapper>
                            <S.InputName>Número de Telefone</S.InputName>
                            <S.Input
                                keyboardType="phone-pad"
                                placeholder="Por favor, digite seu telefone"
                                value={phone}
                                onChangeText={(text) => { formatPhoneNumber(text) }}
                                maxLength={15}
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
                            {showDatePicker && (
                                <DateTimePicker
                                    value={birthDate || new Date()}
                                    mode="date"

                                    display="spinner"
                                    onChange={handleDateChange}
                                    maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 12))}
                                    positiveButton={{ label: 'OK', textColor: STYLE_GUIDE.Colors.secundary }}
                                    negativeButton={{ label: 'Cancel', textColor: STYLE_GUIDE.Colors.secundary }}
                                />
                            )}
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

                        {generalError !== '' && (
                            <S.GeneralErrorText style={{ color: STYLE_GUIDE.Colors.alert, marginTop: 10 }}>{generalError}</S.GeneralErrorText>
                        )}

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
