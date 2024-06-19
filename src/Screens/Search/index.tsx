import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, FlatList, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import * as S from './style';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { STYLE_GUIDE } from '../../Styles/global';
import logo from '../../../assets/logoApp.png'; // Verifique o caminho correto para o seu logo
import { UserContext } from '../../Context/User.context';
import { BottomTab } from '../../Components/BottomTab';

interface Props {
    navigation: any; // Defina o tipo correto para navigation conforme necessário
}

const API_ID = 'bb4dd8ab'; // Substitua com seu Application ID
const API_KEY = '3f0dd545aed637f003ebe5c6486dfc5d'; // Substitua com sua API Key

const Search: React.FC<Props> = ({ navigation }) => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const context = useContext(UserContext)

    const searchFood = async () => {
        if (!query) return;

        setLoading(true);
        try {
            const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${API_ID}&app_key=${API_KEY}&language=pt-br`);
            const data = await response.json();
            setResults(data.hints);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddFood = (food: any) => {
        context?.setNewFood(food)

        navigation.navigate('home')
    };

    return (
        <>
            <ScrollView>

                <S.SearchContainer>
                    <StatusBar style='dark' />
                    <S.ImageLogo source={logo} />
                    <S.FormContainer>
                        <S.FormInputContent>
                            <AntDesign name="search1" size={24} color="black" />
                            <S.FormInput
                                placeholder="Pesquisar"
                                value={query}
                                onChangeText={setQuery}
                                onSubmitEditing={searchFood}
                            />
                        </S.FormInputContent>
                    </S.FormContainer>
                    {loading ? (
                        <ActivityIndicator size="large" color={`${STYLE_GUIDE.Colors.secundary}`} style={{ marginTop: 24 }} />
                    ) : (

                            <S.FootItems>

                                {results.map(item => (
                                    <S.FootItem>
                                        <S.FootNameWrapper>
                                            <S.FootTitle>{item.food.label.substr(0, 16)}</S.FootTitle>
                                            <S.FootSubTitle>{item.food.category}</S.FootSubTitle>
                                        </S.FootNameWrapper>
                                        <S.ButtonAdd onPress={() => handleAddFood(item.food)}>
                                            <S.FootCalories>{item.food.nutrients?.ENERC_KCAL.toFixed(0) || 0} kcal</S.FootCalories>
                                            <AntDesign name="pluscircle" size={31} color={STYLE_GUIDE.Colors.secundary} />
                                        </S.ButtonAdd>
                                    </S.FootItem>
                                ))}
                            </S.FootItems>
                    )}
                </S.SearchContainer>
            </ScrollView>
            <BottomTab navigation={navigation} />
        </>
    );
};

export default Search;
