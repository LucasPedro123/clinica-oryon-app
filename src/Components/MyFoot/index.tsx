import React from 'react'
import * as S from './style'

export default function MyFoot() {
    return (    
        <S.FootContainer>
            <S.FootContent>
                <S.MyFootTitle>
                    Meus Alimentos
                </S.MyFootTitle>
                <S.TextCalories>
                    530 Kcal
                </S.TextCalories>
            </S.FootContent>
            <S.MyFootWrapper>

            </S.MyFootWrapper>
            <S.MyFootButton>
                <S.ButtonText>
                    +
                </S.ButtonText>
                <S.ButtonText>
                    Adicionar
                </S.ButtonText>
            </S.MyFootButton>
        </S.FootContainer>
    )
}
