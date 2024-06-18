import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts'; // Verifique se esta importação está correta e a biblioteca está configurada adequadamente
import { STYLE_GUIDE } from '../../Styles/global';
import * as S from './style';
import { UserContext } from '../../Context/User.context';
import { getFirestore, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

interface DataPoint {
    value: number | null; 
    label: string;
}

export const Chart = () => {
    const context = useContext(UserContext);
    const [data, setData] = useState<DataPoint[]>([]);
    const [selectedCalories, setSelectedCalories] = useState<number | null>(null);
    const db = getFirestore();

    useEffect(() => {
        if (context?.userId) {
            const fetchFoodData = async () => {
                const today = new Date();
                const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Define o início da semana (domingo)

                const foodsCollectionRef = collection(db, `users/${context.userId}/foods`);

                const foodQuery = query(
                    foodsCollectionRef,
                    where('date', '>=', Timestamp.fromDate(startOfWeek)),
                    where('date', '<=', Timestamp.fromDate(new Date()))
                );

                const querySnapshot = await getDocs(foodQuery);
                const foods = querySnapshot.docs.map(doc => doc.data());

                const caloriesByDay: { [key: string]: number } = {};

                foods.forEach((food: any) => {
                    const date = food.date.toDate().toISOString().split('T')[0]; 
                    if (!caloriesByDay[date]) {
                        caloriesByDay[date] = 0;
                    }
                    caloriesByDay[date] += food.nutrients.ENERC_KCAL;
                });

                const chartData: DataPoint[] = [
                    { value: null, label: 'Dom' },
                    { value: null, label: 'Seg' },
                    { value: null, label: 'Ter' },
                    { value: null, label: 'Qua' },
                    { value: null, label: 'Qui' },
                    { value: null, label: 'Sex' },
                    { value: null, label: 'Sab' },
                ];

                Object.keys(caloriesByDay).forEach((date: string) => {
                    const dayOfWeek = new Date(date).getDay(); 
                    const dataPoint = chartData[dayOfWeek];
                    if (dataPoint) {
                        dataPoint.value = caloriesByDay[date];
                    }
                });

                setData(chartData);
            };

            fetchFoodData();
        }
    }, [context?.userId, context?.newFood]);

    useEffect(() => {
        if (selectedCalories != null) {
            setTimeout(() => {
                setSelectedCalories(null);
            }, 5000);
        }
    }, [selectedCalories]);

    const totalCalories = data.reduce((total, item) => total + (item.value || 0), 0).toFixed(2);

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
                        noOfSections={3}
                        barBorderRadius={30}
                        data={data.map(item => ({
                            value: item.value || 0, 
                            label: item.label,
                            frontColor: STYLE_GUIDE.Colors.secundary,
                            onPress: () => setSelectedCalories(item.value || 0),
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
