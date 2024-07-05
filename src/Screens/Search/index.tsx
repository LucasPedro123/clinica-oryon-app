import React, { FC, useContext, useRef, useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, TouchableOpacity, Pressable, Text, View, TextInput } from 'react-native';
import * as S from './style';
import { Feather, AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { STYLE_GUIDE } from '../../Styles/global';
import logo from '../../../assets/logoApp.png';
import { UserContext } from '../../Context/User.context';
import dataFood from '../../../assets/data/foods.data.json';
import { Modalize } from 'react-native-modalize';

interface Props {
    navigation: any;
}

const Search: React.FC<Props> = ({ navigation }) => {
    const modalizeRef = useRef<Modalize>(null);
    const inputRef = useRef<TextInput>(null);
    const [selectedFood, setSelectedFood] = useState<any>(null);
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const context = useContext(UserContext);

    useEffect(() => {
        const focus = navigation.addListener('focus', () => {
            inputRef.current?.focus();
        });

        return focus;
    }, [navigation]);

    const searchFood = () => {
        if (!query) return;

        setLoading(true);
        try {
            const filteredFoods = dataFood.foodItems.filter((item: any) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filteredFoods);
        } catch (error) {
            console.error('Error filtering foods:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddFood = (food: any) => {
        context?.setNewFood(food);
        navigation.navigate('Home');
    };

    const onOpen = (food: any) => {
        setSelectedFood(food);
        modalizeRef.current?.open();
    };

    return (
        <>
            <ScrollView>
                <S.SearchContainer>
                    <S.ImageLogo source={logo} />
                    <S.FormContainer>
                        <S.FormInputContent>
                            <Feather name="search" size={24} color={STYLE_GUIDE.Colors.primary} />
                            <S.FormInput
                                ref={inputRef}
                                placeholder="Pesquisar"
                                value={query}
                                onChangeText={setQuery}
                                onSubmitEditing={searchFood}
                            />
                        </S.FormInputContent>
                    </S.FormContainer>
                    {loading ? (
                        <ActivityIndicator size="large" color={STYLE_GUIDE.Colors.secundary} style={{ marginTop: 24 }} />
                    ) : (
                        <S.FootItems>
                            {results.slice(0, 30).map((item, index) => (
                                <Pressable key={index} onPress={() => onOpen(item)}>
                                    <S.FootItem>
                                        <S.FootNameWrapper>
                                            <S.FootTitle>{item.name.substring(0, 19)}</S.FootTitle>
                                            <S.FootSubTitle>{item.portion.substring(0, 20)}</S.FootSubTitle>
                                        </S.FootNameWrapper>
                                        <S.ButtonAdd>
                                            <S.FootCalories>{item.calories} kcal</S.FootCalories>
                                            <TouchableOpacity onPress={() => handleAddFood(item)}>
                                                <AntDesign name="pluscircle" size={31} color={STYLE_GUIDE.Colors.secundary} />
                                            </TouchableOpacity>
                                        </S.ButtonAdd>
                                    </S.FootItem>
                                </Pressable>
                            ))}
                        </S.FootItems>
                    )}
                </S.SearchContainer>
            </ScrollView>
            <Modalize
                ref={modalizeRef}
                snapPoint={180}
                onClosed={() => setSelectedFood(null)}
            >
                {selectedFood && (
                    <S.ModalView>
                        <S.ModalWrapper>
                            <S.ModalTitle>{selectedFood.name}</S.ModalTitle>
                            <S.ModalPortion>{selectedFood.portion}</S.ModalPortion>
                            <S.ModalCalories>{selectedFood.calories} kcal</S.ModalCalories>
                        </S.ModalWrapper>

                        <S.ModalContent>
                            <S.ModalText>
                                1. Evite refrigerantes comuns e bebidas alcoólicas; substitua por
                                água, refrigerantes dietéticos e sucos diet ou light.
                            </S.ModalText>
                            <S.ModalText>
                                2. Evite usar açúcar. Use adoçantes, tais como: Adocyl, Aspa
                                Sweet, Dietil, Doce Menor, Finn, Frutak, Gold, Línea,
                                Low, Splenda, Stevia, Zero Cal etc.
                            </S.ModalText>
                            <S.ModalText>
                                3. Temperos sem restrição em seu uso: limão, alho, cheiro-verde,
                                pimenta, curry, estragão, raiz forte, salsão, gengibre, louro,
                                hortelã, canela, cominho, tomilho, alecrim, noz-moscada, grão
                                de mostarda, vinagre.
                            </S.ModalText>
                            <S.ModalText>
                                4. À vontade: café, chá e limonada sem açúcar ou com adoçante.
                            </S.ModalText>
                            <S.ModalText>
                                5. Água é fonte de vida: beba, no mínimo, 1 litro e meio por dia.
                            </S.ModalText>
                            <S.ModalText>
                                6. Pratique exercícios. Se não houver contra-indicação, dedique-
                                se às atividades físicas que lhe agradem. Divirta-se!
                            </S.ModalText>
                            <S.ModalText>
                                7. Coma devagar, mastigando bem os alimentos.
                            </S.ModalText>
                            <S.ModalText>
                                8. Ingira, no máximo, 1 copo de líquido durante as refeições.
                            </S.ModalText>
                            <S.ModalText>
                                9. Medicação prescrita é individual e intransferível. Evite álcool durante o uso.
                            </S.ModalText>
                        </S.ModalContent>
                    </S.ModalView>
                )}
            </Modalize>
        </>
    );
};

export default Search;
