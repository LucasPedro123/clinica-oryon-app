import { getFirestore, collection, getDocs, query, where, Timestamp, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { createContext, useState, useEffect, useContext, useCallback, useMemo } from "react";
import { Alert } from 'react-native';
import { storage } from '../Services/fireConfig';
import { getDownloadURL, ref } from 'firebase/storage';
import { IChildren, IUserPros, User } from '../Interfaces/app.interfaces';
import { useFoodContext } from './Foods.context';

const db = getFirestore();

export const UserContext = createContext<IUserPros | undefined>(undefined);

export function UserContextProvider({ children }: IChildren) {
    const [UserName, setUserName] = useState<string>();
    const [UserEmail, setEmail] = useState<string | undefined>();
    const [userId, setUserId] = useState<string | null>(null);
    const [UserPhone, setUserPhone] = useState<number | undefined>();
    const [UserPass, setUserPass] = useState<string | undefined>();
    const [User, setUser] = useState<User>();
    const [errorForm, setErrorForm] = useState<any>();
    const [userPhoto, setUserPhoto] = useState<string>();
    const [foods, setFoods] = useState<any[]>([]); // Inicializa com array vazio
    

    const { setSearchTerm } = useFoodContext();

    useEffect(() => {
        const fetchData = async () => {
            if (!userId || User) return; 

            try {
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
                        firestoreId: userData.firestoreId,
                        password: userData.password,
                        photoURL: userData.photoURL,
                        birthDate: userData.birthDate,
                    });

                    const storageRef = ref(storage, `profile_pictures/${userData.userId}.jpg`);
                    const url = await getDownloadURL(storageRef);

                    setUserPhoto(url);
                } else {
                    console.log('Usuário não encontrado', 'Não foi possível encontrar o usuário.');
                }
            } catch (error: any) {
                console.log('Erro ao buscar usuário ou foto:', error.message);
            }
        };

        fetchData();
        fetchUserFoods();
    }, [userId, User]);

    const fetchUserFoods = useCallback(async () => {
        if (!userId) return;

        try {
            const today = new Date();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            startOfWeek.setHours(0, 0, 0, 0);

            const endOfWeek = new Date(today);
            endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
            endOfWeek.setHours(23, 59, 59, 999);

            const foodsCollectionRef = collection(db, `users/${userId}/foods`);
            const q = query(
                foodsCollectionRef,
                where('date', '>=', Timestamp.fromDate(startOfWeek)),
                where('date', '<=', Timestamp.fromDate(endOfWeek))
            );
            const querySnapshot = await getDocs(q);
            const fetchedFoods = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                date: doc.data().date.toDate(),
            }));


            setFoods(fetchedFoods);
            console.log('Foods fetched:', fetchedFoods);

        } catch (error) {
            console.error('Erro ao buscar alimentos do usuário:', error);
        }
    }, [userId]);

    const addNewFood = useCallback(async (food: any) => {
        setSearchTerm('');
        const newFood = { ...food, date: Timestamp.now() };
    
        if (userId) {
            try {
                const foodDocRef = doc(collection(db, 'users', userId, 'foods'));
                const foodWithId = { ...newFood, firestoreId: foodDocRef.id };
                await setDoc(foodDocRef, foodWithId); // Salva o alimento primeiro
                // Atualiza o estado local com o novo alimento
                setFoods(prevFoods => [...prevFoods, foodWithId]);
            } catch (error: any) {
                Alert.alert('Erro ao salvar alimento', error.message);
            }
        }
    }, [userId, foods]);
    

    const removeFood = useCallback(async (foodId: string) => {
        setFoods(prevFoods => prevFoods.filter(food => food.foodId !== foodId));

        if (userId) {
            try {
                const foodDocRef = doc(db, 'users', userId, 'foods', foodId);
                await deleteDoc(foodDocRef);
            } catch (error: any) {
                Alert.alert('Erro ao excluir alimento', error.message);
            }
        }
    }, [userId]);

    const contextValue = useMemo(() => ({
        setUserName, UserName, setEmail, UserEmail, userId, setUserId, UserPhone, setUserPhone, 
        UserPass, setUserPass, User, setUser,  setNewFood: addNewFood, removeFood, 
        errorForm, setErrorForm, userPhoto, setUserPhoto, foods, setFoods, fetchUserFoods
    }), [UserName, UserEmail, userId, UserPhone, UserPass, User,  userPhoto, foods]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
