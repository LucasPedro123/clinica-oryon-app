import { getFirestore, collection, getDocs, doc, setDoc, Timestamp, deleteDoc } from 'firebase/firestore';
import { createContext, useState, ReactNode, useEffect } from "react";
import { Alert } from 'react-native';
import { storage } from '../Services/fireConfig';
import { getDownloadURL, ref } from 'firebase/storage';
import { IChildren, IUserPros } from '../Interfaces/app.interfaces';


const db = getFirestore();

export const UserContext = createContext<IUserPros | undefined>(undefined);

export function UserContextProvider({ children }: IChildren) {
    const [UserName, setUserName] = useState<string>();
    const [UserEmail, setEmail] = useState<string | undefined>();
    const [userId, setUserId] = useState<string | null>(null);
    const [UserPhone, setUserPhone] = useState<number>();
    const [UserPass, setUserPass] = useState<string | undefined>();
    const [User, setUser] = useState<any>();
    const [errorForm, setErrorForm] = useState<any>();
    const [newFood, setNewFood] = useState<any[]>([]);
    const [userPhoto, setUserPhoto] = useState<string>();

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

                    const storageRef = ref(storage, `profile_pictures/${userId}.jpg`);
                    const url = await getDownloadURL(storageRef);

                    setUserPhoto(url);
                } else {
                    Alert.alert('Usuário não encontrado', 'Não foi possível encontrar o usuário.');
                }
            } catch (error: any) {
                console.log('Usuário não encontrado ou foto não encontrada: ', error.message)
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    const addNewFood = async (food: any) => {
        setNewFood(prevFoods => {
            const updatedFoods = [...prevFoods, food];
    
            if (userId) {
                try {
                    const foodDoc = doc(collection(db, 'users', userId, 'foods'));
                    setDoc(foodDoc, { ...food, date: Timestamp.now() });
                } catch (error: any) {
                    Alert.alert('Erro ao salvar alimento', error.message);
                }
            }
    
            return updatedFoods;
        });
    };

    const removeFood = async (foodId: string) => {
        setNewFood(prevFoods => prevFoods.filter(food => food.foodId !== foodId));

        if (userId) {
            try {
                const foodDocRef = doc(db, 'users', userId, 'foods', foodId);
                await deleteDoc(foodDocRef);
            } catch (error: any) {
                Alert.alert('Erro ao excluir alimento', error.message);
            }
        }
    };

    return (
        <UserContext.Provider value={{ setUserName, UserName, setEmail, UserEmail, userId, setUserId, UserPhone, setUserPhone, UserPass, setUserPass, User, setUser, newFood, setNewFood: addNewFood, removeFood, errorForm, setErrorForm, userPhoto, setUserPhoto }}>
            {children}
        </UserContext.Provider>
    )
}
