

import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { createContext, useState, ReactNode, useEffect } from "react";
import { Alert } from 'react-native';

interface IUserPros {
    UserName: string | undefined;
    setUserName: (user: string) => void;

    UserEmail: string | undefined;
    setEmail: (user: string) => void;

    userId: string | null;
    setUserId: (id: string) => void;

    UserPhone: number | undefined;
    setUserPhone: (user: number) => void;

    UserPass: string | undefined;
    setUserPass: (user: string) => void;

    User: any;
    setUser: (user: any) => void;
}

interface IChildren {
    children: ReactNode;
}

const db = getFirestore();

export const UserContext = createContext<IUserPros | undefined>(undefined);

export function UserContextProvider({ children }: IChildren) {
    const [UserName, setUserName] = useState<string>();
    const [UserEmail, setEmail] = useState<string | undefined>();
    const [userId, setUserId] = useState<string | null>(null);
    const [UserPhone, setUserPhone] = useState<number>();
    const [UserPass, setUserPass] = useState<string | undefined>();
    const [User, setUser] = useState<any>();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const users = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    userId: doc.data().userId 
                }));

                const user = users.find(e => e.userId === userId);

                if (user) {
                    setUser(user);
                    console.log("Usuário encontrado:", user); 
                } else {
                    Alert.alert('Usuário não encontrado', 'Não foi possível encontrar o usuário.');
                }
            } catch (error: any) {
                Alert.alert('Erro ao buscar dados', error.message);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);


    return (
        <UserContext.Provider value={{ setUserName, UserName, setEmail, UserEmail, userId, setUserId, UserPhone, setUserPhone, UserPass, setUserPass, User, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
