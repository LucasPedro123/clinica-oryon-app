import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import * as S from './style';
import { Notification } from '../../../../../Interfaces/app.interfaces';
import { formatDate } from '../../../../../utils/dateUtils'; // Ajuste o caminho conforme necessário
import { ScrollView } from 'react-native';

// Tipo de parâmetros esperados
type NotificationDetailsRouteProp = RouteProp<{ NotificationDetails: { notification: Notification } }, 'NotificationDetails'>;

export const NotificationDetails: React.FC = () => {
    const route = useRoute<NotificationDetailsRouteProp>();
    const { notification } = route.params;

    return (
        <ScrollView
            showsVerticalScrollIndicator={true}
        >
            <S.Container>
                <S.Title>Notificações</S.Title>
                <S.NotificationDetailsContent>
                    <S.NotificationTitle>{notification.title}</S.NotificationTitle>
                    <S.NotificationsDate>{formatDate(notification.date)} • Dr. Danilo Holfling</S.NotificationsDate>

                    <S.NotificationText>
                        {notification.content}
                    </S.NotificationText>
                </S.NotificationDetailsContent>
            </S.Container>
        </ScrollView>
    );
};
