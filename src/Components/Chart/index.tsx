import React, { useContext, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts'; // Certifique-se de que esta importação está correta
import { STYLE_GUIDE } from '../../Styles/global';
import * as S from './style';
import { UserContext } from '../../Context/User.context';
import { getFirestore, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

interface DataPoint {
    value: number;
    label: string;
}

export const Chart = () => {
    const context = useContext(UserContext);
    const [data, setData] = useState<DataPoint[]>([]);
    const [selectedCalories, setSelectedCalories] = useState<number | null>(null);
    const [foodList, setFoodList] = useState<any[]>([]);
    const db = getFirestore();

    const foodsCollectionRef = collection(db, `users/${context?.userId}/foods`);

    useEffect(() => {
        const fetchFoodData = async () => {
            const today = new Date();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay()); // Define o início da semana (domingo)
            startOfWeek.setHours(0, 0, 0, 0);
    
            const endOfWeek = new Date(today);
            endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Define o fim da semana (sábado)
            endOfWeek.setHours(23, 59, 59, 999);
    
    
            try {
                const foodQuery = query(
                    foodsCollectionRef,
                    where('date', '>=', Timestamp.fromDate(startOfWeek)),
                    where('date', '<=', Timestamp.fromDate(endOfWeek))
                );
    
                const querySnapshot = await getDocs(foodQuery);
                const foods = querySnapshot.docs.map(doc => doc.data());
                setFoodList(foods);
    
                const caloriesByDay: { [key: number]: number } = {
                    0: 0,
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0,
                    6: 0,
                };
    
                foods.forEach((food: any) => {
                    const dayOfWeek = food.date.toDate().getDay();
                    caloriesByDay[dayOfWeek] += food.calories;
                });
    
                const chartData: DataPoint[] = [
                    { value: caloriesByDay[0], label: 'Dom' },
                    { value: caloriesByDay[1], label: 'Seg' },
                    { value: caloriesByDay[2], label: 'Ter' },
                    { value: caloriesByDay[3], label: 'Qua' },
                    { value: caloriesByDay[4], label: 'Qui' },
                    { value: caloriesByDay[5], label: 'Sex' },
                    { value: caloriesByDay[6], label: 'Sab' },
                ];
    
                setData(chartData);
            } catch (error) {
                console.error('Erro ao buscar alimentos do usuário:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao buscar alimentos do usuário.');
            }
        };
    
        if (context?.userId) {
            fetchFoodData();
        }
    }, [context?.userId, context?.newFood]);

    useEffect(() => {
        if (selectedCalories !== null) {
            setTimeout(() => {
                setSelectedCalories(null);
            }, 5000);
        }
    }, [selectedCalories, context?.newFood]);

    const totalCalories = data.reduce((total, item) => total + item.value, 0).toFixed(2);

    return (
        <S.ChartContainer style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <S.ChartBorderView>
                <S.ChartContent>
                    <S.ChartTitle>
                        {selectedCalories !== null ? `${selectedCalories.toFixed(2)} Kcal` : `${totalCalories} Kcal na semana`}
                    </S.ChartTitle>
                </S.ChartContent>
                <S.ChartView>
                    <BarChart
                        barWidth={22}
                        noOfSections={4}
                        barBorderRadius={30}
                        data={data.map(item => ({
                            value: item.value || 0,
                            label: item.label,
                            frontColor: STYLE_GUIDE.Colors.secundary,
                            onPress: () => setSelectedCalories(item.value),
                            onPressOut: () => setSelectedCalories(null),
                        }))}
                        yAxisThickness={0}
                        xAxisThickness={0}
                    />
                </S.ChartView>
            </S.ChartBorderView>
        </S.ChartContainer>
    );
};

export default Chart;
