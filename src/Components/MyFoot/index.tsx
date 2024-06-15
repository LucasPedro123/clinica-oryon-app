import React from 'react'
import { TouchableOpacity } from 'react-native'
import * as S from './style'

import Feather from '@expo/vector-icons/Feather';

export default function MyFoot() {
    function FootButton() {
        return (
            <S.MyFootButton>
                <S.ButtonText>
                    +
                </S.ButtonText>
                <S.ButtonText>
                    Adicionar
                </S.ButtonText>
            </S.MyFootButton>
        )
    }

    return (
        <S.FootContainer>
            <S.FootContent>
                <S.MyFootTitle>
                    Meus Alimentos
                </S.MyFootTitle>
                <S.TextTotalCalories>
                    530 Kcal
                </S.TextTotalCalories>
            </S.FootContent>
            <S.MyFoot>
                <S.MyFootWrapper>
                    <S.MyFootView>
                        <S.FootName>Pão de Mel</S.FootName>
                        <S.FootCalories>30 cal</S.FootCalories>
                    </S.MyFootView>
                    <TouchableOpacity>
                        <Feather name="trash-2" size={24} color="black" />
                    </TouchableOpacity>
                </S.MyFootWrapper>
            </S.MyFoot>
            <TouchableOpacity>
                <FootButton />
            </TouchableOpacity>
        </S.FootContainer>
    )
}
