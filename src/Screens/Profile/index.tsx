import React, { useContext, useState } from 'react';
import { TouchableOpacity, Alert, } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import * as S from './style';
import { UserContext } from '../../Context/User.context';
import { BottomTab } from '../../Components/BottomTab';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { auth } from '../../Services/fireConfig';
import { StatusBar } from 'expo-status-bar';

const storage = getStorage();
const db = getFirestore();

export function Profile({ navigation }: any) {
    const context = useContext(UserContext);
    const [uploading, setUploading] = useState(false);

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

    function handleNavigateForHome() {
        navigation.navigate('Home');
    }

    return (
        <>

            <S.ProfileContainer>
                <TouchableOpacity onPress={pickImage}>
                    <ProfilePhoto />
                </TouchableOpacity>
                <S.ProfileName>{context?.User?.name}</S.ProfileName>
                <S.UserInfoView>
                    <S.UserInfoText>Email: {context?.User?.email}</S.UserInfoText>
                    <S.UserInfoText>Telefone: {context?.User?.phone}</S.UserInfoText>
                </S.UserInfoView>
                <TouchableOpacity onPress={handleNavigateForHome}>
                    <S.ProfileExit>Voltar para Home</S.ProfileExit>
                </TouchableOpacity>
            </S.ProfileContainer>
        </>
    );
}
