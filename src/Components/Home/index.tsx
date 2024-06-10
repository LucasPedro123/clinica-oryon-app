import React from 'react';
import { StatusBar, View } from 'react-native';
import * as S from './style';

import Feather from '@expo/vector-icons/Feather';

import { LinearGradient } from 'expo-linear-gradient';
import { Carousel } from '../Slider';

function UserPhoto() {
    return (
        <S.UserPhoto style={{ borderRadius: 50 }}>
            <Feather name="user" size={24} color="black" />

        </S.UserPhoto>
    )
}

export default function Home() {


    return (
        <S.HomeContainer>
            <StatusBar barStyle={'light-content'} />
            <LinearGradient
                style={{ width: '100%', height: 280 }}
                colors={['#080A40', '#1A1B52']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <S.ProfileContent>
                    <S.ProfileWrapper>
                        <S.ProfileText>Olá,</S.ProfileText>
                        <S.ProfileName>Lucas Pedro</S.ProfileName>
                    </S.ProfileWrapper>
                    <UserPhoto />
                </S.ProfileContent>
                <Carousel />
            </LinearGradient>



        </S.HomeContainer>
    );
}
