import React, { useContext, useEffect, useState } from 'react';
import { Alert, View, Text, TextInput, Button, Pressable, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { STYLE_GUIDE } from '../../Styles/global';
import * as S from './style';
import { UserContext } from '../../Context/User.context';
import { getFirestore, collection, query, where, getDocs, Timestamp, doc, setDoc, getDoc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
// import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Portal, Dialog, TextInput as PaperTextInput, Button as PaperButton, ActivityIndicator as PaperActivityIndicator } from 'react-native-paper';

interface DataPoint {
    value: number;
    label: string;
}

export const Chart = () => {
    const context = useContext(UserContext);
    const [data, setData] = useState<DataPoint[]>([]);
    const [selectedCalories, setSelectedCalories] = useState<number | null>(null);
    const [foodList, setFoodList] = useState<any[]>([]);
    const [minCalories, setMinCalories] = useState<number>(0);
    const [maxCalories, setMaxCalories] = useState<number>(2000);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const db = getFirestore();

    const foodsCollectionRef = collection(db, `users/${context?.userId}/foods`);
    const userDocRef = doc(db, `users/${context?.userId}`);

    useEffect(() => {
        const fetchFoodData = async () => {
            const today = new Date();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            startOfWeek.setHours(0, 0, 0, 0);

            const endOfWeek = new Date(today);
            endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
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

        const fetchCalorieLimits = async () => {
            try {
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setMinCalories(userData.minCalories || 0);
                    setMaxCalories(userData.maxCalories || 3100);
                }
            } catch (error) {
                console.error('Erro ao buscar limites de calorias:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao buscar limites de calorias.');
            }
        };

        if (context?.userId) {
            fetchFoodData();
            fetchCalorieLimits();
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

    const saveCalorieLimits = async () => {
        setLoading(true);

        try {
            await setDoc(userDocRef, {
                minCalories,
                maxCalories,
            }, { merge: true });
            setModalVisible(false);
        } catch (error) {
            console.error('Erro ao salvar limites de calorias:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar os limites de calorias.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <S.ChartContainer style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <S.ChartName>Resumo</S.ChartName>
                <S.ChartBorderView>
                    <S.ChartContent>
                        <S.ChartTitle>
                            {selectedCalories !== null ? `${selectedCalories.toFixed(2)} Kcal` : `${totalCalories} Kcal na semana`}
                        </S.ChartTitle>
                        <Pressable>
                            <S.SettingIcon onPress={() => setModalVisible(true)}>
                                <Ionicons name="settings" size={12} color="#FFF" />
                            </S.SettingIcon>
                        </Pressable>
                    </S.ChartContent>
                    <S.ChartView>
                        <BarChart
                            barWidth={22}
                            noOfSections={4}
                            barBorderRadius={30}
                            data={data.map(item => ({
                                value: item.value || 0,
                                label: item.label,
                                frontColor: (item.value < minCalories || item.value > maxCalories) ? '#C2A3D4' : STYLE_GUIDE.Colors.secundary,
                                onPress: () => setSelectedCalories(item.value),
                                onPressOut: () => setSelectedCalories(null),
                            }))}
                            yAxisThickness={0}
                            xAxisThickness={0}
                        />
                    </S.ChartView>
                </S.ChartBorderView>
            </S.ChartContainer>

            <Portal >
        
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
        </>
    );
};

export default Chart;
