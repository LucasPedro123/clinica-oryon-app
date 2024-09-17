import React, { useCallback, useContext, useState } from 'react';
import { TouchableOpacity, Alert, StatusBar, Pressable } from 'react-native';
import * as S from './style';
import { STYLE_GUIDE } from '../../Styles/global';
import Feather from '@expo/vector-icons/Feather';


import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotification } from '../../Context/Notifications.context';
import { isNotificationRead } from '../../utils/notificationStorage';
import { useFocusEffect } from '@react-navigation/native';



export function Settings({ navigation }: any) {
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
    const { notifications } = useNotification();


    async function checkUnreadNotifications() {
        for (const notification of notifications) {
            const isRead = await isNotificationRead(notification.id);
            if (!isRead) {
                setHasUnreadNotifications(true);
                return;
            }
        }
        setHasUnreadNotifications(false);
    }

    useFocusEffect(
        useCallback(() => {
            checkUnreadNotifications();
        }, [notifications])
    );

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
    async function handleNavigateLogOut() {
        await AsyncStorage.removeItem('persistedAuth');
        navigation.navigate('signin');
    }

    return (
        <S.Container>
            <S.SettingsTitle>Configurações</S.SettingsTitle>
            <S.SettingsCards>
                <Pressable onPress={handleNavigateUserConfig}>
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
                </Pressable>
                <Pressable onPress={handleNavigateNotifications}>
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
                </Pressable>
                <Pressable onPress={handleNavigateConfigLogin}>
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
                </Pressable>
                <Pressable onPress={handleNavigateSupportCenter}>
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
                </Pressable>
            </S.SettingsCards>
            <S.Wrapper>
                <TouchableOpacity onPress={handleNavigateLogOut}>
                    <FontAwesome6 name="arrow-right-to-bracket" size={24} color={`${STYLE_GUIDE.Colors.primary}`} />
                </TouchableOpacity>
                <S.Text>Sair da Conta</S.Text>
            </S.Wrapper>
        </S.Container>
    );
}
