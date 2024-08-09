// CardDetails.tsx
import React from 'react';
import * as S from './style';
import { useRoute, RouteProp } from '@react-navigation/native';
import { StackParamList } from '../../../Routes/types.route';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Feather from '@expo/vector-icons/Feather';

type CardDetailsRouteProp = RouteProp<StackParamList, 'CardDetails'>;

export const CardAbout: React.FC = () => {
  const route = useRoute<CardDetailsRouteProp>();
  const { image, title, description, paragraph } = route.params;

  const latitude = -23.58223;
  const longitude = -46.67251;

  return (
    <ScrollView>
      <S.Container>
        <S.CardWrapper>
          <S.ImageWrapper>
            <S.CardImage source={typeof image === 'string' ? { uri: image } : image} />
            <S.Line />
          </S.ImageWrapper>
          <S.CardTitle>{title}</S.CardTitle>
          <S.WrapperRow>
            <Feather name="map-pin" size={13} color={"#2D2D2D"} />
            <S.AndressText>São Paulo, Rua Tabapuã, 111 - conjunto 92</S.AndressText>
          </S.WrapperRow>
          <S.Description>Descrição</S.Description>
          <S.CardDescription>{description}</S.CardDescription>
          <S.CardDescription>{paragraph}</S.CardDescription>
            <S.Description>Mapa</S.Description>
          <View style={{ height: 172, width: '100%', borderRadius: 30, overflow: 'hidden' }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.0052,
                longitudeDelta: 0.0000,
              }}
            >
              <Marker coordinate={{ latitude, longitude }} />
            </MapView>
          </View>
        </S.CardWrapper>
      </S.Container>
    </ScrollView>
  );
};
