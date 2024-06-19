import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as S from './style';
import Feather from '@expo/vector-icons/Feather';
import { UserContext } from '../../Context/User.context';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

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
}

const MyFoot = ({ navigation }: any) => {
    const context = useContext(UserContext);
    const [foodList, setFoodList] = useState<IFood[]>([]);
    const db = getFirestore();

    useEffect(() => {
        const fetchUserFoods = async () => {
            if (!context?.userId) return;

            const foodsCollectionRef = collection(db, `users/${context.userId}/foods`);

            try {
                const querySnapshot = await getDocs(foodsCollectionRef);
                const fetchedFoods = querySnapshot.docs.map(doc => ({ ...doc.data(), foodId: doc.id } as IFood));
                setFoodList(fetchedFoods);
            } catch (error) {
                console.error('Erro ao buscar alimentos do usuário:', error);
            }
        };

        fetchUserFoods();
    }, [context?.userId, foodList]);

    const totalCaloriesToday = foodList.reduce((total, food) => total + food.nutrients.ENERC_KCAL, 0).toFixed(2);

    const handleRemoveFood = async (foodId: string) => {
        await context?.removeFood(foodId);
        setFoodList(prevFoods => prevFoods.filter(food => food.foodId !== foodId));
    };

    function handleNavigateForSearch() {
        navigation.navigate('search')
    }

    return (
        <S.FootContainer>
            <S.FootContent>
                <S.MyFootTitle>Meus Alimentos</S.MyFootTitle>
                <S.TextTotalCalories>{totalCaloriesToday} Kcal</S.TextTotalCalories>
            </S.FootContent>
            {foodList.map((food, index) => (
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
            ))}
            <TouchableOpacity onPress={()=> {handleNavigateForSearch()}}>
                <S.MyFootButton>
                    <S.ButtonText>+</S.ButtonText>
                    <S.ButtonText>Adicionar</S.ButtonText>
                </S.MyFootButton>
            </TouchableOpacity>
        </S.FootContainer>
    );
};

export default MyFoot;
