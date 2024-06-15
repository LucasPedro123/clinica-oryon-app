import { Text, TouchableOpacity, View } from "react-native";

import Feather from '@expo/vector-icons/Feather';
import * as S from './style'

import { UserContext } from '../../Context/User.context';
import { useContext } from "react";
import { StatusBar } from "expo-status-bar";

export function Profile({navigation}: any) {
    const context = useContext(UserContext);

    function handleNavigateForHome() {
        navigation.navigate('home')
    }

    function ProfilePhoto() {
        return (
            <S.ProfilePhoto>
                <Feather name="user" size={60} color="black" />
            </S.ProfilePhoto>
        )
    }

    return (
        <S.ProfileContainer>
            <StatusBar style="dark" />
            <ProfilePhoto />
            <S.ProfileName>{context?.User?.name}</S.ProfileName>
            <S.UserInfoView>
                <S.UserInfoText>Email: {context?.User?.email}</S.UserInfoText>
                <S.UserInfoText>Telefone: {context?.User?.phone}</S.UserInfoText>
            </S.UserInfoView>
            <TouchableOpacity onPress={()=>{handleNavigateForHome()}}>
                <S.ProfileExit>Voltar para Home</S.ProfileExit>
            </TouchableOpacity>
        </S.ProfileContainer>
    )
}