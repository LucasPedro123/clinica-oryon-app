import React, { useContext, useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import * as S from './style';
import Feather from '@expo/vector-icons/Feather';
import { UserContext } from '../../Context/User.context';
import { getFirestore, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { STYLE_GUIDE } from '../../Styles/global';
import { AntDesign } from '@expo/vector-icons';
import { Food } from '../../Interfaces/app.interfaces';



const MyFoot = ({ navigation }: any) => {
    const context = useContext(UserContext);

    const handleRemoveFood = async (foods: Food) => {
        context?.removeFood(foods);
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

    const todayFoods = context?.foods.filter((food: Food) => {
        if (food.date) {
            const foodDate = food.date instanceof Date ? food.date : food.date.toDate();
            return isToday(foodDate);
        }
        return false;
    });

    const totalCaloriesToday = todayFoods.reduce((total: number, food: Food) => total + food.calories, 0).toFixed(0);
    context?.setTotalCaloriesDay(totalCaloriesToday)

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
                {todayFoods.length > 0 ? (
                    todayFoods.map((food: Food, index: number) => (
                        <S.MyFoot key={index}>
                            <S.MyFootWrapper>
                                <S.MyFootView>
                                    <S.FootName>{food.name}</S.FootName>
                                    <S.FootCalories>{`${food.calories.toFixed(0)} Kcal`}</S.FootCalories>
                                </S.MyFootView>
                                <TouchableOpacity onPress={() => handleRemoveFood(food)}>
                                    <Feather name="trash-2" size={24} color="black" />
                                </TouchableOpacity>
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
