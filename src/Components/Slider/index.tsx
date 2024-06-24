import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { STYLE_GUIDE } from '../../Styles/global';

import carousel1 from '../../../assets/carousel-1.jpg'
import carousel2 from '../../../assets/carousel-2.jpg'
import carousel3 from '../../../assets/carousel-3.jpg'

const DATA = [
    {
        image: carousel1,
    },
    {
        image: carousel2,
    },
    {
        image: carousel3,
    },
];

export const Carousel = () => {
    const [activeBanner, setActiveBanner] = useState<number>(0);
    const FlatlistRef = useRef<FlatList>(null);

    const onViewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems[0] !== undefined) {
            setActiveBanner(viewableItems[0]?.index);
        }
    };

    const viewabilityConfigCallbackPairs = useRef([
        {
            viewabilityConfig: {
                itemVisiblePercentThreshold: 80,
            },
            onViewableItemsChanged,
        },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (activeBanner === DATA.length - 1) {
                FlatlistRef.current?.scrollToIndex({
                    animated: true,
                    index: 0,
                });
                setActiveBanner(0);
            } else {
                FlatlistRef.current?.scrollToIndex({
                    animated: true,
                    index: activeBanner + 1,
                });
                setActiveBanner(activeBanner + 1);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [activeBanner]);

    return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: -150 }}>
            <FlatList
                ref={FlatlistRef}
                data={DATA}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            width: Dimensions.get('screen').width * 0.8,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 180, // Ajuste da altura para garantir visibilidade
                            borderRadius: 30,
                            marginHorizontal: 10, // Reduzi a margem horizontal para evitar cortes
                        }}
                    >
                        <Animatable.Image
                            animation={activeBanner === index ? 'fadeInLeft' : 'fadeOutRight'}
                            duration={500}
                            source={item.image}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 30,
                            }}
                            resizeMode='cover' // Use 'cover' para preencher a área do container
                        />
                    </View>
                )}
                style={{
                    paddingTop: 20,
                    height: 200, // Altura do FlatList ajustada para acomodar as imagens
                }}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                }}
                pagingEnabled
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                horizontal
                keyExtractor={(item, index) => String(index)}
                showsHorizontalScrollIndicator={false}
            />
            <View style={styles.pagination}>
                {DATA.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            {
                                width: activeBanner === index ? 12 : 8, // Largura ajustada conforme estado ativo
                                backgroundColor:
                                    activeBanner === index
                                        ? STYLE_GUIDE.BlueGradient.blue500
                                        : STYLE_GUIDE.Colors.neutral,
                            },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        marginBottom: -30,
    },
    paginationDot: {
        height: 8,
        borderRadius: 6,
        backgroundColor: STYLE_GUIDE.Colors.neutral,
        marginHorizontal: 4,
    },
});

export default Carousel;
