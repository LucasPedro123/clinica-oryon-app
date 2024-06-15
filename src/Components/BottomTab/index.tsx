import React, { Text, TouchableOpacity } from 'react-native'
import * as S from './style'

import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export function BottomTab({navigation}: any) {
    function handleNavigateForProfile() {
        navigation.navigate('profile')
    }
    function handleNavigateForHome() {
        navigation.navigate('home')
    }

    function HomeIcon() {
        return (
            <Feather name="home" size={37} color="white" />
        )
    }
    function ProfileIcon() {
        return (
            <Feather name="user" size={37} color="white" />
        )
    }

    function AddedIcon() {
        return (
            <LinearGradient
                colors={['#080A40', '#1A1B52']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    width: 80,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    marginTop: -30,

                    shadowColor: '#000',
                    shadowOffset: { width: 4, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                }}
            >
                <Text style={{
                    color: 'white',
                    fontSize: 40,
                }}>
                    +
                </Text>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            style={{ width: '100%', height: 76 }}
            colors={['#080A40', '#1A1B52']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >

            <S.BottomTabContainer>
                <S.TabItems>
                    <TouchableOpacity onPress={()=>{handleNavigateForHome()}}>
                        <HomeIcon />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AddedIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{handleNavigateForProfile()}}>
                        <ProfileIcon />
                    </TouchableOpacity>
                </S.TabItems>
            </S.BottomTabContainer>
        </LinearGradient>
    )
}