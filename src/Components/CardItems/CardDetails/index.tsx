// CardDetails.tsx
import React from 'react';
import * as S from './style';
import { useRoute, RouteProp } from '@react-navigation/native';
import { StackParamList } from '../../../Routes/types.route';
import { ScrollView, Text } from 'react-native';

type CardDetailsRouteProp = RouteProp<StackParamList, 'CardDetails'>;

export const CardDetails: React.FC = () => {
  const route = useRoute<CardDetailsRouteProp>();
  const { image, title, description, paragraph } = route.params;

  return (
    <ScrollView>
      <S.Container>
        <S.CardWrapper>
          <S.ImageWrapper>
            <S.CardImage source={typeof image === 'string' ? { uri: image } : image} />
            <S.Line />
          </S.ImageWrapper>
          <S.CardTitle>{title}</S.CardTitle>
          <S.Description>Descrição</S.Description>
          <S.CardDescription>{description}</S.CardDescription>
          <S.CardDescription>{paragraph}</S.CardDescription>
        </S.CardWrapper>
      </S.Container>
    </ScrollView>
  );
};