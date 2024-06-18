import React, { useContext, useEffect } from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import * as S from './style';
import { UserContext } from '../../Context/User.context';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { Carousel } from '../../Components/Slider';
import { Chart } from '../../Components/Chart';
import MyFoot from '../../Components/MyFoot';
import { BottomTab } from '../../Components/BottomTab';

function UserPhoto() {
    return (
        <S.UserPhoto style={{ borderRadius: 50 }}>
            <Feather name="user" size={24} color="black" />
        </S.UserPhoto>
    );
}

interface User {
    name: string;
}

export default function Home({ navigation }: any) {
    const context = useContext(UserContext);

    function handleNavigatorForProfile() {
        navigation.navigate('profile');
    }

    return (
        <>
            <ScrollView>
                <S.HomeContainer>
                    <StatusBar barStyle="light-content" />
                    <LinearGradient
                        style={{ width: '100%', height: 280 }}
                        colors={['#080A40', '#1A1B52']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <S.ProfileContent>
                            <S.ProfileWrapper>
                                <S.ProfileText>Olá,</S.ProfileText>
                                <S.ProfileName>{context?.User?.name || ''}</S.ProfileName>
                            </S.ProfileWrapper>
                            <TouchableOpacity onPress={() => handleNavigatorForProfile()}>
                                <UserPhoto />
                            </TouchableOpacity>

                        </S.ProfileContent>
                        <Carousel />
                    </LinearGradient>
                    <Chart />
                    <MyFoot navigation={navigation} />
                </S.HomeContainer>
            </ScrollView>
            <BottomTab navigation={navigation} />
        </>
    );
}
