import React, { useContext } from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import * as S from './style';
import { UserContext } from '../../Context/User.context';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import  Carousel  from '../../Components/Slider';
import Chart from '../../Components/Chart';
import MyFoot from '../../Components/MyFoot';
import { BottomTab } from '../../Components/BottomTab';
import { STYLE_GUIDE } from '../../Styles/global';
import * as Animatable from 'react-native-animatable';

interface User {
    name: string;
}

export default function Home({ navigation }: any) {
    const context = useContext(UserContext);

    function handleNavigatorForProfile() {
        navigation.navigate('profile');
    }

    function UserPhoto() {
        if (context?.userPhoto) {
            return (
                <S.UserPhoto>
                    <S.ProfileImage source={{ uri: context?.userPhoto }} borderRadius={50} />
                </S.UserPhoto>
            );
        } else {
            return (
                <S.UserPhoto style={{ borderRadius: 50 }}>
                    <Feather name="user" size={24} color="black" />
                </S.UserPhoto>
            );
        }
    }

    return (
        <>
            <ScrollView>
                <S.HomeContainer>
                    <StatusBar barStyle={'light-content'} backgroundColor={'#080A40'} />
                    <LinearGradient
                        style={{ width: '100%', height: 280 }}
                        colors={['#080A40', '#1A1B52']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <S.ProfileContent>
                            <Animatable.View
                                animation="slideInDown"
                                duration={700}
                                delay={2300}
                            >
                                <S.ProfileWrapper>
                                    <S.ProfileText>Olá,</S.ProfileText>
                                    <S.ProfileName>{context?.User?.name || ''}</S.ProfileName>
                                </S.ProfileWrapper>
                            </Animatable.View>
                            <TouchableOpacity onPress={() => handleNavigatorForProfile()}>
                                <Animatable.View
                                    animation="slideInRight"
                                    duration={1100}
                                    delay={1700}
                                >
                                    <UserPhoto />
                                </Animatable.View>
                            </TouchableOpacity>
                        </S.ProfileContent>
                    </LinearGradient>
                    <Carousel />
                    <Chart />
                    <MyFoot navigation={navigation} />
                </S.HomeContainer>
            </ScrollView>
            <BottomTab navigation={navigation} />
        </>
    );
}
