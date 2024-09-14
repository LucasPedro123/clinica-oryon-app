import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as S from './style';
import { UserContext } from '../../Context/User.context';
import Feather from '@expo/vector-icons/Feather';
import Carousel from '../../Components/Slider';
import MyFoot from '../../Components/MyFoot';
import * as Animatable from 'react-native-animatable';
import { Card } from '../../Components/CardItems';
import { STYLE_GUIDE } from '../../Styles/global';
import * as Notifications from 'expo-notifications';
import { useNotification } from '../../Context/Notifications.context';
import { isNotificationRead } from '../../utils/notificationStorage'
import Octicons from '@expo/vector-icons/Octicons';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function Home({ navigation }: any) {
    const context = useContext(UserContext);
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

    async function scheduleNotifications() {
        try {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permissão para notificações não concedida.');
                return;
            }

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `Olá, ${context?.User.name}!`,
                    body: 'Já fez o cálculo das calorias de hoje? Mantenha seu progresso em dia!',
                    data: { type: 'calories', userId: context?.userId },
                },
                trigger: {
                    hour: 9,
                    minute: 0,
                    repeats: false,
                },
            });

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `Boa noite, ${context?.User.name}!`,
                    body: 'Veja o resumo das calorias que você consumiu hoje. Está dentro da sua meta?',
                    data: { type: 'calories', userId: context?.userId },
                },
                trigger: {
                    hour: 20,
                    minute: 0,
                    repeats: true,
                },
            });
        } catch (error: any) {
            console.log('Erro ao agendar notificações', error.message);
        }
    }

    useEffect(() => {
        scheduleNotifications();
    }, []);

    function handleNavigatorForProfile() {
        navigation.navigate('ProfileUser');
    }
    function handleNavigatorForNotifications() {
        navigation.navigate('Notifications');
    }

    function UserPhoto() {
        if (context?.userPhoto) {
            return (
                <S.UserPhoto>
                    <S.ProfileImage source={{ uri: context?.userPhoto }} borderRadius={50} />
                </S.UserPhoto>
            );
        } else {
            return (
                <S.UserPhoto style={{ borderRadius: 50 }}>
                    <Feather name="user" size={24} color="black" />
                </S.UserPhoto>
            );
        }
    }

    return (
        <>
            <ScrollView>
                <StatusBar backgroundColor={'#080A40'} />
                <S.HomeContainer>
                    <View
                        style={{ width: '100%', height: 280, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: '#080A40', zIndex: -1 }}
                    >
                        <S.ProfileContent>
                            <Animatable.View
                                animation="slideInDown"
                                duration={1500}
                                delay={2300}
                                style={{ flexDirection: 'row', gap: 20 }}
                            >
                                <Animatable.View
                                    animation="slideInLeft"
                                    duration={1100}
                                    delay={1700}
                                >
                                    <TouchableOpacity onPress={() => handleNavigatorForProfile()}>
                                        <UserPhoto />
                                    </TouchableOpacity>
                                </Animatable.View>
                                <S.ProfileWrapper>
                                    <S.ProfileText>Olá,</S.ProfileText>
                                    <S.ProfileName>{context?.User?.name || ''}</S.ProfileName>
                                </S.ProfileWrapper>
                            </Animatable.View>
                            <Animatable.View
                                animation="slideInRight"
                                duration={1700}
                                delay={1700}
                            >
                                <TouchableOpacity onPress={() => handleNavigatorForNotifications()}>
                                    {hasUnreadNotifications && <S.CircleNotifications />}
                                    <Octicons name="bell-fill" size={24} color={STYLE_GUIDE.Colors.white} />
                                </TouchableOpacity>
                            </Animatable.View>
                        </S.ProfileContent>
                    </View>
                    <Carousel />
                    <S.Wrapper>
                        <Card />
                        <MyFoot navigation={navigation} />
                    </S.Wrapper>
                </S.HomeContainer>
            </ScrollView>
        </>
    );
}
