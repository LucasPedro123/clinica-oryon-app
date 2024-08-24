import React from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import * as S from './style';
import { useNotification } from '../../../../Context/Notifications.context';
import { formatDate } from '../../../../utils/dateUtils'; // Ajuste o caminho conforme necessário
import { STYLE_GUIDE } from '../../../../Styles/global';

export const Notifications: React.FC = ({ navigation }: any) => {
    const { notifications, loading } = useNotification();

    function handleNavigateNotificationDetails(notification: any) {
        navigation.navigate('NotificationDetails', { notification });
    }

    if (loading) {
        return <ActivityIndicator size="large" color={STYLE_GUIDE.Colors.secundary} />;
    }

    return (
        <S.Container>
            <S.Title>Notificações</S.Title>
            <ScrollView>
                {notifications.map((notification) => (
                    <S.Wrapper key={notification.id}>
                        <S.NotificationCard onPress={() => handleNavigateNotificationDetails(notification)}>
                            <S.NotificationData>{formatDate(notification.date)}</S.NotificationData>
                            <S.NotificationAuthor>Dr. Danilo Bianchini Höfling</S.NotificationAuthor>
                            <S.NotificationTitle>{notification.title}</S.NotificationTitle>
                            <S.NotificationContent>
                                {notification.content.length > 50
                                    ? `${notification.content.substring(0, 80)}...`
                                    : `${notification.content}...`

                                }
                            </S.NotificationContent>
                        </S.NotificationCard>
                    </S.Wrapper>
                ))}
            </ScrollView>
        </S.Container>
    );
};
