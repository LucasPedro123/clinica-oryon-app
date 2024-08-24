import { useContext, useState } from 'react';
import { Alert, Image, Pressable, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as S from './style';
import { UserContext } from '../../../../Context/User.context';
import PencilIcon from '../../../../../assets/pencil-icon.png';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../../Services/fireConfig';
import Feather from '@expo/vector-icons/Feather';
import { doc, updateDoc } from 'firebase/firestore';
import { STYLE_GUIDE } from '../../../../Styles/global';

export const ProfileUser: React.FC = ({navigation}: any) => {
    const context = useContext(UserContext);
    const [uploading, setUploading] = useState(false);
    const [inputActive, setInputActive] = useState(false);
    const [tempName, setTempName] = useState(context?.User?.name || '');

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
                <Pressable onPress={() => setInputActive(true)}>
                    <Image source={PencilIcon} />
                </Pressable>
            </S.ProfileView>
            <S.ProfileWrapper>
                <S.ProfileInfoView>
                    <S.ProfileInfoValue>{context?.User?.email}</S.ProfileInfoValue>
                </S.ProfileInfoView>
                <S.ProfileInfoView>
                    <S.ProfileInfoValue>{context?.User?.phone}</S.ProfileInfoValue>
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
    );
};
