import { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Dimensions } from 'react-native';
import { STYLE_GUIDE } from '../../Styles/global';

const DATA = [
    {
        image: 'https://www.atendevoce.com.br/itaim/favImage-clinicaoryon.jpg',
    },
    {
        image: 'http://clinicaoryon.com.br/wp-content/uploads/2016/08/estetica_nova.jpg',
    },
    {
        image: 'http://clinicaoryon.com.br/wp-content/uploads/2016/08/dr_danilo.jpg',
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
        if (activeBanner === DATA.length - 1) {
            const timeId = setTimeout(() => {
                FlatlistRef.current?.scrollToIndex({
                    index: 0,
                    animated: true,
                });
                setActiveBanner(0);
            }, 3000);
            return () => clearTimeout(timeId);
        }
        const timeId = setTimeout(() => {
            FlatlistRef.current?.scrollToIndex({
                index: activeBanner + 1,
                animated: true,
            });
            setActiveBanner((old) => old + 1);
        }, 3000);
        return () => clearTimeout(timeId);
    }, [activeBanner]);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
            <FlatList
                ref={FlatlistRef}
                data={DATA}
                renderItem={({ item }) => (
                    <View
                        style={{
                            width: Dimensions.get('screen').width * 0.8,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 180,
                            borderRadius: 30,
                            marginHorizontal: 20,
                        }}
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={{
                                width: '100%',
                                height: '100%',
                                alignSelf: 'center',
                                borderRadius: 30,
                                resizeMode: 'cover',
                            }}
                        />
                    </View>
                )}
                style={{
                    height: 200,
                }}
                contentContainerStyle={{
                    paddingVertical: 20,
                }}
                pagingEnabled
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                horizontal
                keyExtractor={(item, index) => String(index)}
                showsHorizontalScrollIndicator={false}
            />
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                {DATA.map((_, index) => (
                    <View
                        key={index}
                       
                        style={{
                            width: activeBanner === index ? 12 : 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: activeBanner === index ? `${STYLE_GUIDE.BlueGradient.blue500}` : `${STYLE_GUIDE.Colors.neutral}`,
                            marginHorizontal: 2,
                        }}
                    />
                ))}
            </View>
        </View>
    );
};
