import React, { useContext, useState } from 'react';
import { TouchableOpacity, Alert, StatusBar } from 'react-native';
import * as S from './style';
import { STYLE_GUIDE } from '../../Styles/global';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



export function Settings({ navigation }: any) {
   

    function handleNavigateNotifications() {
        navigation.navigate('Notifications');
    }
    function handleNavigateUserConfig() {
        navigation.navigate('ProfileUser');
    }
    function handleNavigateSupportCenter() {
        navigation.navigate('SupportCenter');
    }
    function handleNavigateConfigLogin() {
        navigation.navigate('ConfigLogin');
    }

    return (
        <S.Container>
            <S.SettingsTitle>Configurações</S.SettingsTitle>
            <S.SettingsCards>
                <S.SettingsCard>
                    <S.CardWrapper>
                        <S.IconContent>
                            <AntDesign name="user" size={24} color={`${STYLE_GUIDE.Colors.primary}`} />
                        </S.IconContent>
                        <S.CardName>Perfil do Usuário</S.CardName>
                    </S.CardWrapper>
                    <TouchableOpacity onPress={handleNavigateUserConfig}>
                        <MaterialIcons name="arrow-forward-ios" size={24} color={`${STYLE_GUIDE.Colors.primary}`} />
                    </TouchableOpacity>
                </S.SettingsCard>
                <S.SettingsCard>
                    <S.CardWrapper>
                        <S.IconContent>
                            <Fontisto name="bell" size={24} color={`${STYLE_GUIDE.Colors.primary}`} />
                        </S.IconContent>
                        <S.CardName>Notificações</S.CardName>
                    </S.CardWrapper>
                    <TouchableOpacity onPress={handleNavigateNotifications}>
                        <MaterialIcons name="arrow-forward-ios" size={24} color={`${STYLE_GUIDE.Colors.primary}`} />
                    </TouchableOpacity>
                </S.SettingsCard>
                <S.SettingsCard>
                    <S.CardWrapper>
                        <S.IconContent>
                            <MaterialCommunityIcons name="account-key-outline" size={24} color={`${STYLE_GUIDE.Colors.primary}`} />
                        </S.IconContent>
                        <S.CardName>Configurações de Login</S.CardName>
                    </S.CardWrapper>
                    <TouchableOpacity onPress={handleNavigateConfigLogin}>
                        <MaterialIcons name="arrow-forward-ios" size={24} color={`${STYLE_GUIDE.Colors.primary}`} />
                    </TouchableOpacity>
                </S.SettingsCard>
                <S.SettingsCard>
                    <S.CardWrapper>
                        <S.IconContent>
                            <MaterialIcons name="phone-in-talk" size={24} color={`${STYLE_GUIDE.Colors.primary}`} />
                        </S.IconContent>
                        <S.CardName>Centro de Suporte</S.CardName>
                    </S.CardWrapper>
                    <TouchableOpacity onPress={handleNavigateSupportCenter}>
                        <MaterialIcons name="arrow-forward-ios" size={24} color={`${STYLE_GUIDE.Colors.primary}`} />
                    </TouchableOpacity>
                </S.SettingsCard>
            </S.SettingsCards>
            <S.Wrapper>
                <TouchableOpacity>
                    <FontAwesome6 name="arrow-right-to-bracket" size={24} color={`${STYLE_GUIDE.Colors.primary}`} />
                </TouchableOpacity>
                <S.Text>Sair da Conta</S.Text>
            </S.Wrapper>
        </S.Container>
    );
}
