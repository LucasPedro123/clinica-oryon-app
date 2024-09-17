import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, View, Text, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { STYLE_GUIDE } from '../../Styles/global';
import * as S from './style';
import { UserContext } from '../../Context/User.context';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Portal, Dialog, Button as PaperButton } from 'react-native-paper';
import { BarChart } from 'react-native-gifted-charts';
import { DataPoint, Food } from '../../Interfaces/app.interfaces';
import AntDesign from '@expo/vector-icons/AntDesign';
import documentTable from './document';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const Chart = () => {
    const context = useContext(UserContext);
    const [data, setData] = useState<DataPoint[]>([]);
    const [selectedCalories, setSelectedCalories] = useState<number | null>(null);
    const [foodToday, setFoodToday] = useState<number | null>(null);
    const [minCalories, setMinCalories] = useState<number>(0);
    const [maxCalories, setMaxCalories] = useState<number>(2000);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingData, setLoadingData] = useState<boolean>(true);

    const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
    const [dataHtml, setDataHtml] = useState<string>('');

    let totalCalories = data.reduce((total, item) => total + item.y, 0).toFixed(2);
    const averageCalories = data.length > 0 ? (data.reduce((total, item) => total + item.y, 0) / data.length).toFixed(2) : '0.00';

    const db = getFirestore();
    const userDocRef = doc(db, `users/${context?.userId}`);

    const fetchFoodData = useCallback(async () => {
        setLoadingData(true);
        try {
            const foods = context?.foods || [];
            const caloriesByDay: { [key: number]: number } = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
            foods.forEach((food: Food) => {
                const foodTimestamp = food.date;
                if (foodTimestamp && foodTimestamp.seconds !== undefined && foodTimestamp.nanoseconds !== undefined) {
                    const foodDate = new Date(foodTimestamp.seconds * 1000 + foodTimestamp.nanoseconds / 1000000);
                    const dayOfWeek = foodDate.getDay();
                    caloriesByDay[dayOfWeek] += food.calories;
                } else {
                    const foodDate = new Date(food.date);
                    const dayOfWeek = foodDate.getDay();
                    caloriesByDay[dayOfWeek] += food.calories;
                }
            });

            const chartData = [
                { day: 'Dom', y: caloriesByDay[0] },
                { day: 'Seg', y: caloriesByDay[1] },
                { day: 'Ter', y: caloriesByDay[2] },
                { day: 'Qua', y: caloriesByDay[3] },
                { day: 'Qui', y: caloriesByDay[4] },
                { day: 'Sex', y: caloriesByDay[5] },
                { day: 'Sab', y: caloriesByDay[6] },
            ];

            setData(chartData);
            setFoodToday(caloriesByDay[new Date().getDay()]);
        } catch (error) {
            console.error('Erro ao buscar alimentos do usuário:', error);
        } finally {
            setLoadingData(false);
        }
    }, [context?.foods, context?.userId]);

    useEffect(() => {
        fetchFoodData();
        if (context?.foods?.length > 0 && context?.User) {
            totalCalories = data.reduce((total, item) => total + item.y, 0).toFixed(2);

            let html = documentTable(context.foods, Number(totalCalories), context.User.name, context.User.birthDate);
            setDataHtml(html)
        }
    }, [context?.foods, context?.userId]);

    useEffect(() => {
        if (selectedCalories !== null) {
            setTimeout(() => {
                setSelectedCalories(null);
            }, 5000);
        }
    }, [selectedCalories]);

    const saveCalorieLimits = async () => {
        setLoading(true);
        try {
            await setDoc(userDocRef, { minCalories, maxCalories }, { merge: true });
            setModalVisible(false);
        } catch (error) {
            console.error('Erro ao salvar limites de calorias:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar os limites de calorias.');
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={STYLE_GUIDE.Colors.secundary} />
            </View>
        );
    }



    const printToFile = async () => {
        setIsGeneratingPDF(true);
        try {
            const { uri } = await Print.printToFileAsync({ html: dataHtml });
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        } catch (error) {
            console.error('Erro ao gerar o PDF:', error);
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    if (!context?.foods || !context?.User) {
        return <ActivityIndicator size="large" color={STYLE_GUIDE.Colors.secundary} />;
    }

    return (
        <View style={{ flexGrow: 1 }}>
            <S.Title>Gráfico</S.Title>
            <S.ChartContainer style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {loading ? (
                    <ActivityIndicator size="large" color={STYLE_GUIDE.Colors.secundary} style={{ marginTop: 24 }} />
                ) : (
                    <>
                        <S.NumberTitle>
                            {selectedCalories !== null ? `${selectedCalories.toFixed(0)}` : `${foodToday}`}
                            <Text style={{ fontSize: 16 }}> Kcal</Text>
                        </S.NumberTitle>
                        <S.ChartItems>
                            <S.ChartItem>
                                <S.ItemTitle>Média</S.ItemTitle>
                                <S.ItemValue>{averageCalories}</S.ItemValue>
                            </S.ChartItem>
                            <S.ChartItem>
                                <S.ItemTitle>Calorias</S.ItemTitle>
                                <S.ItemValue>{`${totalCalories}`}</S.ItemValue>
                            </S.ChartItem>
                            <Pressable onPress={() => setModalVisible(true)}>
                                <Ionicons name="settings" size={20} color={STYLE_GUIDE.Colors.primary} />
                            </Pressable>
                        </S.ChartItems>
                        <S.ChartBorderView>
                            <S.ChartView>
                                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                                    <BarChart
                                        barWidth={22}
                                        noOfSections={4}
                                        barBorderRadius={30}
                                        data={data.map(item => ({
                                            value: item.y || 0,
                                            label: item.day,
                                            frontColor: item.y < minCalories || item.y > maxCalories
                                                ? STYLE_GUIDE.Colors.alert
                                                : STYLE_GUIDE.Colors.secundary,
                                            onPress: () => setSelectedCalories(item.y),
                                        }))}
                                        yAxisThickness={0}
                                        xAxisThickness={0}
                                        disableScroll
                                        animationDuration={1000}
                                        initialSpacing={10}
                                    />
                                </View>
                            </S.ChartView>
                        </S.ChartBorderView>
                    </>
                )}
            </S.ChartContainer>

            <Pressable onPress={printToFile}>
                <S.Button>
                    {isGeneratingPDF ? (
                        <ActivityIndicator size="large" color={STYLE_GUIDE.Colors.secundary} />
                    ) : (
                        <>
                            <AntDesign name="download" size={30} color={STYLE_GUIDE.Colors.primary} />
                            <Text style={{ color: STYLE_GUIDE.Colors.primary }}>Baixar</Text>
                        </>
                    )}
                </S.Button>
            </Pressable>
            <Portal>
                <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)} style={{ backgroundColor: '#fff' }}>
                    <S.modalTitle>Definir Limites de Calorias</S.modalTitle>
                    <Dialog.Content>
                        <S.modalInput
                            placeholder="Mínimo de Calorias"
                            keyboardType="numeric"
                            value={minCalories.toString()}
                            onChangeText={text => setMinCalories(parseInt(text) || 0)}
                        />
                        <S.modalInput
                            placeholder="Máximo de Calorias"
                            keyboardType="numeric"
                            value={maxCalories.toString()}
                            onChangeText={text => setMaxCalories(parseInt(text) || 0)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <PaperButton onPress={saveCalorieLimits} loading={loading}>
                            {loading ? '' : 'Salvar'}
                        </PaperButton>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default Chart;
