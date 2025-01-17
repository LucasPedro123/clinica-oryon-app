import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import * as S from './style';
import Feather from '@expo/vector-icons/Feather';
import { UserContext } from '../../Context/User.context';
import { AntDesign } from '@expo/vector-icons';
import { Food } from '../../Interfaces/app.interfaces';
import { STYLE_GUIDE } from '../../Styles/global';

const MyFoot = ({ navigation }: any) => {
    const context = useContext(UserContext);

    const handleRemoveFood = async (food: Food) => {
        context?.removeFood(food);
    };

    const handleNavigateForSearch = () => {
        navigation.navigate('Search');
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const uniqueFoods = context?.foods
        .filter((food: Food) => {
            if (food.date) {
                const foodDate = food.date instanceof Date ? food.date : food.date.toDate();
                return isToday(foodDate);
            }
            return false;
        })
        .reduce((acc: Record<string, Food>, food: Food) => {
            if (acc[food.name]) {
                acc[food.name].quantity = (acc[food.name].quantity || 1) + 1;
            } else {
                acc[food.name] = { ...food, quantity: 1 };
            }
            return acc;
        }, {});

    const foodList = uniqueFoods ? (Object.values(uniqueFoods) as Food[]) : [];

    return (
        <View>
            <S.ButtonWrapper>
                <S.Button onPress={handleNavigateForSearch}>
                    <AntDesign name="pluscircle" size={31} color={STYLE_GUIDE.Colors.secundary} />
                </S.Button>
                <S.ButtonText>Adicionar Alimentos</S.ButtonText>
            </S.ButtonWrapper>
            <S.FootContent>
                <S.MyFootTitle>Meus Alimentos</S.MyFootTitle>
            </S.FootContent>
            <S.FootContainer>
                {foodList.length > 0 ? (
                    foodList.map((food: Food, index: number) => (
                        <S.MyFoot key={index}>
                            <S.MyFootWrapper>
                                <S.MyFootView>
                                    <S.FootName>{food.name}</S.FootName>
                                    <S.FootCalories>{`${(food.calories * (food.quantity || 1)).toFixed(0)} Kcal`}</S.FootCalories>
                                </S.MyFootView>
                                <S.Wrapper>
                                    <S.FootCalories>Qtd: {food.quantity}</S.FootCalories>
                                    <TouchableOpacity onPress={() => handleRemoveFood(food)}>
                                        <Feather name="trash-2" size={24} color="black" />
                                    </TouchableOpacity>
                                </S.Wrapper>
                            </S.MyFootWrapper>
                        </S.MyFoot>
                    ))
                ) : (
                    <S.NoFoodMessage>Nenhum alimento adicionado hoje.</S.NoFoodMessage>
                )}
            </S.FootContainer>
        </View>
    );
};

export default MyFoot;
