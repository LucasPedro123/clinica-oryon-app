import AsyncStorage from '@react-native-async-storage/async-storage';

export const markNotificationAsRead = async (notificationId: string) => {
    try {
        const readNotifications = await AsyncStorage.getItem('readNotifications');
        const parsedReadNotifications = readNotifications ? JSON.parse(readNotifications) : [];

        if (!parsedReadNotifications.includes(notificationId)) {
            parsedReadNotifications.push(notificationId);
            await AsyncStorage.setItem('readNotifications', JSON.stringify(parsedReadNotifications));
        }
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
};

export const isNotificationRead = async (notificationId: string): Promise<boolean> => {
    try {
        const readNotifications = await AsyncStorage.getItem('readNotifications');
        const parsedReadNotifications = readNotifications ? JSON.parse(readNotifications) : [];
        return parsedReadNotifications.includes(notificationId);
    } catch (error) {
        console.error('Error checking if notification is read:', error);
        return false;
    }
};
