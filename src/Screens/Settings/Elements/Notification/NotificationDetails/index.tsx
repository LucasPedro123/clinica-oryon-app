import React, { useEffect } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ScrollView, TouchableOpacity, Linking } from 'react-native';
import * as S from './style';
import { Notification } from '../../../../../Interfaces/app.interfaces';
import { formatDate } from '../../../../../utils/dateUtils';
import { markNotificationAsRead } from '../../../../../utils/notificationStorage';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { STYLE_GUIDE } from '../../../../../Styles/global';

type NotificationDetailsRouteProp = RouteProp<{ NotificationDetails: { notification: Notification } }, 'NotificationDetails'>;

export const NotificationDetails: React.FC = () => {
    const route = useRoute<NotificationDetailsRouteProp>();
    const { notification } = route.params;

    useEffect(() => {
        markNotificationAsRead(notification.id);
    }, [notification.id]);

    const handleOpenURL = (url: string) => {
        Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
    };

    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            <S.Container>
                <S.Title>Notificações</S.Title>
                <S.NotificationDetailsContent>
                    <S.NotificationTitle>{notification.title}</S.NotificationTitle>
                    <S.Wrapper>
                        <S.NotificationsDate>{formatDate(notification.date)} • Dr. Danilo Holfling</S.NotificationsDate>
                        <S.ContentLinks>
                            <TouchableOpacity onPress={() => handleOpenURL('https://www.instagram.com/drdanilohofling')}>
                                <Entypo name="instagram" size={20} color={STYLE_GUIDE.Colors.gray200} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleOpenURL('https://www.linkedin.com/company/clinica-oryon/about/')}>
                                <Feather name="linkedin" size={20} color={STYLE_GUIDE.Colors.gray200} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleOpenURL('https://wa.me/5511993516440')}>
                                <FontAwesome name="whatsapp" size={20} color={STYLE_GUIDE.Colors.gray200} />
                            </TouchableOpacity>
                        </S.ContentLinks>
                    </S.Wrapper>
                    <S.NotificationText>{notification.content}</S.NotificationText>
                </S.NotificationDetailsContent>
            </S.Container>
        </ScrollView>
    );
};
