import React, { createContext, useState, useEffect, useContext } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../Services/fireConfig'; // Importe a configuração do Firestore
import { Notification, NotificationContextType } from '../Interfaces/app.interfaces';



const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const q = query(collection(db, 'notifications'));
                const querySnapshot = await getDocs(q);
                const fetchedNotifications: Notification[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Notification[];
                setNotifications(fetchedNotifications);
            } catch (error) {
                console.error("Error fetching notifications: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, loading }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};
