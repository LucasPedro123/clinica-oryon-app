import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as S from './style';
import { useNotification } from '../../../../Context/Notifications.context';
import { formatDate } from '../../../../utils/dateUtils';
import { STYLE_GUIDE } from '../../../../Styles/global';
import { isNotificationRead } from '../../../../utils/notificationStorage'; // Importe as funções que criamos
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Notifications: React.FC = ({ navigation }: any) => {
    const { notifications, loading } = useNotification();
    const [readStatuses, setReadStatuses] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const checkReadStatuses = async () => {
            const statuses: { [key: string]: boolean } = {};
            for (const notification of notifications) {
                const isRead = await isNotificationRead(notification.id);
                statuses[notification.id] = isRead;
            }
            setReadStatuses(statuses);
        };
        checkReadStatuses();
    }, [notifications, handleNavigateNotificationDetails]);

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
                           {!readStatuses[notification.id] ? <S.BallRed /> : ''}
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
