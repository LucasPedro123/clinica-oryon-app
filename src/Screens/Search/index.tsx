import React, { FC, useContext, useRef, useState, useEffect, } from 'react';
import { ScrollView, ActivityIndicator, TouchableOpacity, Pressable, Text, View, TextInput, StatusBar } from 'react-native';
import * as S from './style';
import { Feather, AntDesign } from '@expo/vector-icons';

import { STYLE_GUIDE } from '../../Styles/global';
import logo from '../../../assets/logoApp.png';
import { UserContext } from '../../Context/User.context';
import { Modalize } from 'react-native-modalize';
import { useFoodContext } from '../../Context/Foods.context';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';
import { Food } from '../../Interfaces/app.interfaces';
import { db } from '../../Services/fireConfig';

interface Props {
    navigation: any;
}

const Search: React.FC<Props> = ({ navigation }) => {
    const modalizeRef = useRef<Modalize>(null);
    const inputRef = useRef<TextInput>(null);
    const [selectedFood, setSelectedFood] = useState<any>(null);
    const context = useContext(UserContext);
    const { foodItems, searchTerm, setSearchTerm } = useFoodContext(); 

    useEffect(() => {
        const focus = navigation.addListener('focus', () => {
            inputRef.current?.focus();
        });

        return focus;
    }, [navigation]);

    const handleAddFood = (food: Food) => {
        context?.setNewFood(food);
        const newFood: Food = { ...food, date: Timestamp.now() };
        context?.setFoods([...context.foods, newFood]);  
    };
    

    const handleSubtractFood = async (food: Food) => {
        context?.removeFood(food);
    };



    const onOpen = (food: any) => {
        setSelectedFood(food);
        modalizeRef.current?.open();
    };

    function VerifyFoodByIdToday(item: Food): number {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        const foundFood = context?.foods.filter((e: Food) => {
    
            const foodDate = new Date(e.date); 
            if (isNaN(foodDate.getTime())) {
                return false; 
            }
    
            return (
                e._id === item._id &&
                foodDate.setHours(0, 0, 0, 0) === today.getTime() 
            );
        });
    
        return foundFood ? foundFood.length : 0;
    }
    
    
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
                                value={searchTerm}
                                onChangeText={setSearchTerm}
                                onSubmitEditing={() => { }}
                            />
                        </S.FormInputContent>
                    </S.FormContainer>
                    {foodItems.length === 0 ? (
                        <ActivityIndicator size="large" color={STYLE_GUIDE.Colors.secundary} style={{ marginTop: 24 }} />
                    ) : (
                        <S.FootItems>
                            {foodItems.slice(0, 30).map((item : Food, index) => (
                                <Pressable key={index} onPress={() => onOpen(item)}>
                                    <S.FootItem>
                                        <S.FootNameWrapper>
                                            <S.FootTitle>{item.name.substring(0, 15)}</S.FootTitle>
                                            <S.FootSubTitle>{item.portion.substring(0, 19)}</S.FootSubTitle>
                                        </S.FootNameWrapper>
                                        <S.ButtonAdd>
                                            <S.FootCalories>{item.calories} kcal</S.FootCalories>
                                            <S.Wrapper>
                                                <TouchableOpacity onPress={() => context?.foods.find((e : Food)=> e.id == item.id ? handleSubtractFood(e) : '')}>
                                                    <AntDesign name="minuscircle" size={31} color={STYLE_GUIDE.Colors.secundary} />
                                                </TouchableOpacity>
                                                <Text>
                                                    {VerifyFoodByIdToday(item)}
                                                </Text>
                                                <TouchableOpacity onPress={() => handleAddFood(item)}>
                                                    <AntDesign name="pluscircle" size={31} color={STYLE_GUIDE.Colors.secundary} />
                                                </TouchableOpacity>
                                            </S.Wrapper>
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
