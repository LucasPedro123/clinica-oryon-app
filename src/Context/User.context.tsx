import { createContext, useState, useEffect, useContext, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setFoods, addFood, removeFood as removeFoodAction } from '../slices/foodsSlice';
import { getFirestore, collection, getDocs, query, where, Timestamp, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { storage } from '../Services/fireConfig';
import { getDownloadURL, ref } from 'firebase/storage';
import { Food, IChildren, IUserPros, User } from '../Interfaces/app.interfaces';
import { RootState, AppDispatch } from '../store';

const db = getFirestore();

export const UserContext = createContext<IUserPros | undefined>(undefined);

export function UserContextProvider({ children }: IChildren) {
  const [userId, setUserId] = useState<string | null>(null);
  const [User, setUser] = useState<User>();
  const [errorForm, setErrorForm] = useState<any>();
  const [userPhoto, setUserPhoto] = useState<string>();
  const dispatch = useDispatch<AppDispatch>();
  const foods = useSelector((state: RootState) => state.foods.list);
  const [totalCaloriesDay, setTotalCaloriesDay] = useState<number>(0);
  

  useEffect(() => {
    const fetchData = async () => {
      if (!userId || User) return;

      try {
        const q = query(collection(db, 'users'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data() as User;
          setUser({
            id: userDoc.id,
            userId: userData.userId,
            name: userData.name,
            surname: userData.surname,
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
      const fetchedFoods = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          date: data.date.toDate(),
          quantity: data.quantity || 0, 
        } as Food;
      });

      dispatch(setFoods(fetchedFoods));
    } catch (error) {
      console.error('Erro ao buscar alimentos do usuário:', error);
    }
  }, [userId, dispatch]);


  const addNewFood = useCallback(async (food: Food) => {
    const newFood = { ...food, date: Timestamp.now().toDate() };
    

    if (userId) {
        try {
            const foodDocRef = doc(collection(db, 'users', userId, 'foods'));
            const foodWithId = { ...newFood, firestoreId: foodDocRef.id };
            await setDoc(foodDocRef, foodWithId); 
            dispatch(addFood(foodWithId));
        } catch (error: any) {
            console.log('Erro ao salvar alimento', error.message);
        }
    }
}, [userId, dispatch]);


  const removeFood = useCallback(async (foodRemove: Food) => {
    if (userId && foodRemove.firestoreId) {
      try {
        const foodDocRef = doc(db, 'users', userId, 'foods', foodRemove.firestoreId);
        await deleteDoc(foodDocRef);
        dispatch(removeFoodAction(foodRemove.firestoreId));
      } catch (error: any) {
        console.log('Erro ao excluir alimento', error.message);
      }
    }
  }, [userId, dispatch]);


  const contextValue = useMemo(() => ({
    userId, setUserId, User, setUser, setNewFood: addNewFood, removeFood, 
    errorForm, setErrorForm, userPhoto, setUserPhoto, foods, setFoods, fetchUserFoods, totalCaloriesDay, setTotalCaloriesDay
  }), [userId, User, userPhoto, foods]);

return (
  <UserContext.Provider value={contextValue}>
    {children}
  </UserContext.Provider>
);
}
