import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Dimensions, Animated } from 'react-native';
import carousel1 from '../../../assets/slider-4.jpg'
import carousel2 from '../../../assets/carousel-2.jpg'
import carousel3 from '../../../assets/slider-5.jpg'
import { STYLE_GUIDE } from '../../Styles/global';

const DATA = [
    {
        image:
            carousel1,
    },
    {
        image:
            carousel2,
    },
    
    {
        image:
            carousel3,
    },
    
];

const Carousel = () => {
    const [activeBanner, setActiveBanner] = useState<number>(0);
    const FlatlistRef = useRef<FlatList>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

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
        }, 10000);

        return () => clearInterval(interval);
    }, [activeBanner]);

    return (
        <View style={{ alignItems: 'center', marginTop: -130, marginBottom: 60, zIndex: 999 }}>
            <Animated.FlatList
                ref={FlatlistRef}
                data={DATA}
                renderItem={({ item }) => (
                    <View
                        style={{
                            width: Dimensions.get('screen').width * 0.8,
                            alignItems: 'center',
                            height: 180,
                            borderRadius: 30,
                            marginHorizontal: 40,
                        }}
                    >
                        <Animated.Image
                            source={item.image}
                            style={{
                                width: 370,
                                height: '100%',
                                alignSelf: 'center',
                                borderRadius: 30,
                                objectFit: 'cover',
                                transform: [
                                    {
                                        scale: scrollX.interpolate({
                                            inputRange: [
                                                (activeBanner - 1) * Dimensions.get('screen').width * 0.8,
                                                activeBanner * Dimensions.get('screen').width * 0.8,
                                                (activeBanner + 1) * Dimensions.get('screen').width * 0.8,
                                                
                                            ],
                                            outputRange: [0.9, 1, 0.9],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                ],
                            }}
                            resizeMode="contain"
                        />
                    </View>
                )}
                keyExtractor={(item, index) => String(index)}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
            />
            <View style={{ flexDirection: 'row', marginTop: -17, alignItems: 'center', }}>
                {DATA.map((_, index) => {
                    const dotScale = scrollX.interpolate({
                        inputRange: [
                            (index - 1) * Dimensions.get('screen').width * 0.8,
                            index * Dimensions.get('screen').width * 0.8,
                            (index + 1) * Dimensions.get('screen').width * 0.8,
                        ],
                        outputRange: [0.8, 1.2, 0.8],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={{
                                width: activeBanner !== index ? 10 : 14,
                                height: activeBanner !== index ? 10 : 8,
                                borderRadius: 5,
                                backgroundColor: activeBanner === index ? STYLE_GUIDE.Colors.secundary : STYLE_GUIDE.Colors.gray200,
                                marginHorizontal: 5,
                                transform: [{ scale: dotScale }],
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default Carousel;
