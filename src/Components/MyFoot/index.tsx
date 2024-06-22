import React, { useContext, useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import * as S from './style';
import Feather from '@expo/vector-icons/Feather';
import { UserContext } from '../../Context/User.context';
import { getFirestore, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

interface Nutrients {
    CHOCDF: number;
    ENERC_KCAL: number;
    FAT: number;
    FIBTG: number;
    PROCNT: number;
}

interface IFood {
    label: string;
    nutrients: Nutrients;
    foodId: string;
    date: Timestamp;
}

const MyFoot = ({ navigation }: any) => {
    const context = useContext(UserContext);
    const [foodList, setFoodList] = useState<IFood[]>([]);
    const db = getFirestore();

    const foodsCollectionRef = collection(db, `users/${context?.userId}/foods`);

    useEffect(() => {
        const fetchUserFoods = async () => {
            if (!context?.userId) return;

            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

           

            try {
                const q = query(
                    foodsCollectionRef,
                    where('date', '>=', Timestamp.fromDate(startOfDay)),
                    where('date', '<=', Timestamp.fromDate(endOfDay))
                );
                const querySnapshot = await getDocs(q);
                const fetchedFoods = querySnapshot.docs.map(doc => {
                    console.log('Doc Data:', doc.data());
                    return {
                        ...doc.data(),
                        foodId: doc.id,
                        date: doc.data().date.toDate()
                    } as IFood;
                });

                console.log('Fetched foods:', fetchedFoods);
                setFoodList(fetchedFoods);
            } catch (error) {
                console.error('Erro ao buscar alimentos do usuário:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao buscar alimentos do usuário.');
            }
        };

        fetchUserFoods();
    }, [context?.userId, context?.newFood]);

    const totalCaloriesToday = foodList.reduce((total, food) => total + food.nutrients.ENERC_KCAL, 0).toFixed(2);

    const handleRemoveFood = async (foodId: string) => {
        await context?.removeFood(foodId);
        setFoodList(prevFoods => prevFoods.filter(food => food.foodId !== foodId));
    };

    function handleNavigateForSearch() {
        navigation.navigate('search');
    }

    return (
        <S.FootContainer>
            <S.FootContent>
                <S.MyFootTitle>Meus Alimentos</S.MyFootTitle>
                <S.TextTotalCalories>{totalCaloriesToday} Kcal</S.TextTotalCalories>
            </S.FootContent>
            {foodList.length > 0 ? (
                foodList.map((food, index) => (
                    <S.MyFoot key={index}>
                        <S.MyFootWrapper>
                            <S.MyFootView>
                                <S.FootName>{food.label}</S.FootName>
                                <S.FootCalories>{`${food.nutrients.ENERC_KCAL.toFixed(0)} Kcal`}</S.FootCalories>
                            </S.MyFootView>
                            <TouchableOpacity onPress={() => handleRemoveFood(food.foodId)}>
                                <Feather name="trash-2" size={24} color="black" />
                            </TouchableOpacity>
                        </S.MyFootWrapper>
                    </S.MyFoot>
                ))
            ) : (
                <S.NoFoodMessage>Nenhum alimento adicionado hoje.</S.NoFoodMessage>
            )}
            <TouchableOpacity onPress={() => { handleNavigateForSearch(); }}>
                <S.MyFootButton>
                    <S.ButtonText>+</S.ButtonText>
                    <S.ButtonText>Adicionar</S.ButtonText>
                </S.MyFootButton>
            </TouchableOpacity>
        </S.FootContainer>
    );
};

export default MyFoot;
