
import { useContext, useState } from 'react';
import { Alert, Image, Pressable, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as S from './style';
import { UserContext } from '../../../../Context/User.context';
import PencilIcon from '../../../../../assets/pencil-icon.png';

import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../../Services/fireConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { STYLE_GUIDE } from '../../../../Styles/global';

export const ProfileUser: React.FC = ({ navigation }: any) => {
    const context = useContext(UserContext);
    const [uploading, setUploading] = useState(false);
    const [inputActive, setInputActive] = useState(false);
    const [tempName, setTempName] = useState(context?.User?.name || '');

    const [surnameActive, setSurnameActive] = useState(false);
    const [tempSurname, setTempSurname] = useState(context?.User?.surname || '');

    const [phoneActive, setPhoneActive] = useState(false);
    const [tempPhone, setTempPhone] = useState(context?.User?.phone || '');

    const [birthDateActive, setBirthDateActive] = useState(false);
    const [tempBirthDate, setTempBirthDate] = useState(context?.User?.birthDate || '');

    // Função para converter string 'DD/MM/YYYY' para Timestamp
    function convertToTimestamp(dateStr: string) {
        const [day, month, year] = dateStr.split('/');
        const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return Timestamp.fromDate(dateObj);
    }

    // Função para converter a data de 'DD/MM/YYYY' para ISO 8601
    function convertToISOString(dateStr: string) {
        const [day, month, year] = dateStr.split('/');
        const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return dateObj.toISOString();
    }

    // Função para formatar ISO para 'DD/MM/YYYY'
    function formatToDDMMYYYY(isoDate: string) {
        const dateObj = new Date(isoDate);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
    }




    // Função para validar o formato 'DD/MM/YYYY'
    function isValidDateFormat(date: string) {
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return dateRegex.test(date);
    }

    async function updateBirthDate() {
        if (!context?.User?.id) return;

        try {
            // Verificar se o formato da data é válido
            if (!isValidDateFormat(tempBirthDate)) {
                setTempBirthDate(context?.User?.birthDate?.toDate().toLocaleDateString() || '');
                return;
            }

            // Converter para o formato ISO 8601
            const birthDateISO = convertToISOString(tempBirthDate);

            const userRef = doc(db, 'users', context.User.id);
            await updateDoc(userRef, { birthDate: birthDateISO });
            context?.setUser({ ...context.User, birthDate: birthDateISO });
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar a data de nascimento.');
            console.error('Erro ao atualizar a data de nascimento:', error);
        }
    }

    function handleBirthDateBlur() {
        setBirthDateActive(false);
        updateBirthDate();
    }

    async function updateSurname() {
        if (!context?.User?.id) return;

        try {
            const userRef = doc(db, 'users', context.User.id);
            await updateDoc(userRef, { surname: tempSurname });
            context?.setUser({ ...context.User, surname: tempSurname });
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar o sobrenome.');
            console.error('Erro ao atualizar o sobrenome:', error);
        }
    }

    function handleSurnameBlur() {
        setSurnameActive(false);
        setTempSurname(context?.User?.surname || '');
    }


    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            uploadImage(result.assets[0].uri);
        }
    }

    function ProfilePhoto() {
        if (context?.userPhoto) {
            return (
                <S.ProfileImage source={{ uri: context.userPhoto }} />
            );
        }

        return (
            <S.ProfilePhoto>
                <Feather name="user" size={60} color="black" />
            </S.ProfilePhoto>
        );
    }

    async function uploadImage(uri: string) {
        setUploading(true);
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const userId = context?.userId; // Utiliza o userId do contexto do usuário atual

            if (!userId) {
                Alert.alert('Erro', 'Usuário não autenticado.');
                setUploading(false);
                return;
            }

            const storageRef = ref(storage, `profile_pictures/${userId}.jpg`);
            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef);

            context?.setUserPhoto(url);

            Alert.alert('Sucesso', 'Foto de perfil atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao fazer upload da foto:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao fazer upload da foto.');
        } finally {
            setUploading(false);
        }
    }

    async function updateName() {
        if (!context?.User?.id) return;

        try {
            const userRef = doc(db, 'users', context.User.id);
            await updateDoc(userRef, { name: tempName });
            context?.setUser({ ...context.User, name: tempName });
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar o nome.');
            console.error('Erro ao atualizar o nome:', error);
        }
    }

    async function updatePhone() {
        if (!context?.User?.id) return;

        try {
            const userRef = doc(db, 'users', context.User.id);
            await updateDoc(userRef, { phone: tempPhone });
            context?.setUser({ ...context.User, phone: tempPhone });
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar o telefone.');
            console.error('Erro ao atualizar o telefone:', error);
        }
    }

    function handlePhoneBlur() {
        setPhoneActive(false);
        setTempPhone(context?.User?.phone || '');
    }



    function handleBlur() {
        setInputActive(false);
        setTempName(context?.User?.name || '');
    }

    function handleNavigateNotifications() {
        navigation.navigate('Notifications');
    }
    function handleNavigateUserConfig() {
        navigation.navigate('ConfigLogin');
    }
    function handleNavigateSupportCenter() {
        navigation.navigate('SupportCenter');
    }

    console.log(context?.User.birthDate)


    return (
        <S.Container>
            <S.ProfileContent onPress={pickImage}>
                <ProfilePhoto />
                <S.ProfileLabelView>
                    <S.ProfileLabel>Upload</S.ProfileLabel>
                </S.ProfileLabelView>
            </S.ProfileContent>
            <S.ProfileView>
                {inputActive ? (
                    <TextInput
                        value={tempName}
                        onChangeText={setTempName}
                        onSubmitEditing={() => {
                            updateName();
                            setInputActive(false);
                        }}
                        onBlur={handleBlur}
                        style={{ fontSize: 22, fontWeight: '500', color: STYLE_GUIDE.Colors.primary }}
                        autoFocus
                    />
                ) : (
                    <S.ProfileName>{context?.User?.name}</S.ProfileName>
                )}
                <Pressable onPress={() => setInputActive(!inputActive)}>
                    <Image source={PencilIcon} />
                </Pressable>
            </S.ProfileView>
            <S.ProfileInfoView onPress={() => setSurnameActive(!surnameActive)}>
                {surnameActive ? (
                    <TextInput
                        value={tempSurname}
                        onChangeText={setTempSurname}
                        onSubmitEditing={() => {
                            updateSurname();
                            setSurnameActive(false);
                        }}
                        onBlur={handleSurnameBlur}
                        style={{ fontSize: 16, color: STYLE_GUIDE.Colors.primary, padding: 10 }}
                        autoFocus
                    />
                ) : (
                    <S.ProfileInfoValue>{context?.User?.surname}</S.ProfileInfoValue>
                )}
            </S.ProfileInfoView>

            <S.ProfileWrapper>
                <S.ProfileInfoView onPress={() => setBirthDateActive(!birthDateActive)}>
                    {birthDateActive ? (
                        <TextInput
                            onChangeText={setTempBirthDate}
                            onSubmitEditing={() => {
                                updateBirthDate();
                                setBirthDateActive(false);
                            }}
                            onBlur={handleBirthDateBlur}
                            style={{ fontSize: 16, color: STYLE_GUIDE.Colors.primary, padding: 10 }}
                            autoFocus
                        />
                    ) : (
                        <S.ProfileInfoValue>
                            {context?.User?.birthDate && typeof context.User.birthDate.toDate === 'function'
                                ? formatToDDMMYYYY(context.User.birthDate.toDate().toISOString())
                                : formatToDDMMYYYY(context?.User.birthDate)
                            }
                        </S.ProfileInfoValue>
                    )}
                </S.ProfileInfoView>

                <S.ProfileInfoView onPress={() => setPhoneActive(!phoneActive)}>
                    {phoneActive ? (
                        <TextInput
                            value={tempPhone}
                            onChangeText={setTempPhone}
                            onSubmitEditing={() => {
                                updatePhone();
                                setPhoneActive(false);
                            }}
                            onBlur={handlePhoneBlur}
                            style={{ fontSize: 16, color: STYLE_GUIDE.Colors.primary, padding: 10 }}
                            keyboardType="phone-pad"
                            autoFocus
                        />
                    ) : (
                        <S.ProfileInfoValue>{context?.User?.phone}</S.ProfileInfoValue>
                    )}
                </S.ProfileInfoView>
                <S.ProfileInfoView>
                    <S.ProfileInfoValue>{context?.User?.email}</S.ProfileInfoValue>
                </S.ProfileInfoView>
                <S.SettingsCards>
                    <S.SettingsCard>
                        <S.CardWrapper>

                            <S.CardName>Notificações</S.CardName>
                        </S.CardWrapper>
                        <TouchableOpacity onPress={handleNavigateNotifications}>
                            <MaterialIcons name="arrow-forward-ios" size={24} color={`${STYLE_GUIDE.Colors.primary}`} />
                        </TouchableOpacity>
                    </S.SettingsCard>
                    <S.SettingsCard>
                        <S.CardWrapper>

                            <S.CardName>Configurações de Login</S.CardName>
                        </S.CardWrapper>
                        <TouchableOpacity onPress={handleNavigateUserConfig}>
                            <MaterialIcons name="arrow-forward-ios" size={24} color={`${STYLE_GUIDE.Colors.primary}`} />
                        </TouchableOpacity>
                    </S.SettingsCard>
                    <S.SettingsCard>
                        <S.CardWrapper>

                            <S.CardName>Centro de Suporte</S.CardName>
                        </S.CardWrapper>
                        <TouchableOpacity onPress={handleNavigateSupportCenter}>
                            <MaterialIcons name="arrow-forward-ios" size={24} color={`${STYLE_GUIDE.Colors.primary}`} />
                        </TouchableOpacity>
                    </S.SettingsCard>
                </S.SettingsCards>
            </S.ProfileWrapper>
        </S.Container>
    )
};
