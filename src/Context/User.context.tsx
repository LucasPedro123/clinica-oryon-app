import { getFirestore, collection, getDocs, query, where, deleteDoc, doc, Timestamp, setDoc } from 'firebase/firestore';
import { createContext, useState, useEffect } from "react";
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
    const [UserPhone, setUserPhone] = useState<number | undefined>();
    const [UserPass, setUserPass] = useState<string | undefined>();
    const [User, setUser] = useState<any>();
    const [errorForm, setErrorForm] = useState<any>();
    const [newFood, setNewFood] = useState<any[]>([]);
    const [userPhoto, setUserPhoto] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;

            try {
                // Consulta filtrada para encontrar o documento correspondente ao `userId` autenticado
                const q = query(collection(db, 'users'), where('userId', '==', userId));
                const querySnapshot = await getDocs(q);
                
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const userData = userDoc.data();
                    setUser({
                        id: userDoc.id,
                        userId: userData.userId,
                        name: userData.name,
                        email: userData.email,
                        phone: userData.phone,
                        password: userData.password,
                        photoURL: userData.photoURL,
                        birthDate: userData.birthDate,
                    });

                    // Buscar URL da foto de perfil
                    const storageRef = ref(storage, `profile_pictures/${userData.userId}.jpg`);
                    const url = await getDownloadURL(storageRef);
                    setUserPhoto(url);
                } else {
                    Alert.alert('Usuário não encontrado', 'Não foi possível encontrar o usuário.');
                }
            } catch (error: any) {
                console.log('Erro ao buscar usuário ou foto:', error.message);
            }
        };

        fetchData();
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
    );
}
