import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { STYLE_GUIDE } from '../../Styles/global';
import * as S from './style';

interface DataPoint {
    value: number;
    label: string;
}

export const Chart = () => {
    const [selectedCalories, setSelectedCalories] = useState<number | null>(null);

    useEffect(() => {
        if (selectedCalories != null) {
            setTimeout(() => {
                setSelectedCalories(null)
            }, 5000)
        }
    }, [selectedCalories])

    const data: DataPoint[] = [
        { value: 3000, label: 'Seg' },
        { value: 2748, label: 'Ter' },
        { value: 1800, label: 'Qua' },
        { value: 3000, label: 'Qui' },
        { value: 2800, label: 'Sex' },
        { value: 2200, label: 'Sab' },
        { value: 2600, label: 'Dom' },
    ];

    const totalCalories = data.reduce((total, item) => total + item.value, 0);

    return (
        <S.ChartContainer style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <S.ChartBorderView>
                <S.ChartContent>
                    <S.ChartTitle>
                        {selectedCalories !== null ? `${selectedCalories} Kcal` : `${totalCalories} Kcal na semana`}
                    </S.ChartTitle>
                </S.ChartContent>
                <S.ChartView>
                    <BarChart
                        barWidth={22}
                        noOfSections={3}
                        barBorderRadius={30}
                        frontColor={STYLE_GUIDE.Colors.secundary}
                        data={data.map(item => ({
                            value: item.value,
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
