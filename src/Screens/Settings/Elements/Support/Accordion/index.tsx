import React, { useState } from 'react'
import { Linking, Pressable } from 'react-native';
import * as S from './style'
import { Animated, TouchableOpacity } from 'react-native'
import { STYLE_GUIDE } from '../../../../../Styles/global'


import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Fontisto from '@expo/vector-icons/Fontisto';

type AccordionProps = {
    icon: string,
    title: string,
    content: string,
}


const AccordionElement: React.FC<AccordionProps> = ({
    icon,
    title,
    content,
}) => {
    const [open, setOpen] = useState(false)
    const [animation] = useState(new Animated.Value(0))

    function toggleAccordion() {
        if (!open) {
            Animated.timing(animation, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false
            }).start(() => {
                setOpen(true)
            });
        } else {
            Animated.timing(animation, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false
            }).start(() => {
                setOpen(false)
            });
        }
    }

    const heightAnimationInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 30]
    })

    const handleContentClick = () => {
        if (icon === 'phone') {
            Linking.openURL(`tel:${content}`);
        } else if (icon === 'whatsapp') {
            const whatsappUrl = `https://wa.me/5511993516440`;
            Linking.openURL(whatsappUrl)
        } else if (icon === 'email') {
            Linking.openURL(`mailto:${content}`);
        } else if (icon === 'web') {
            Linking.openURL(content);
        }
    };


    return (
        <S.AccordionContainer>

            <Pressable onPress={() => { toggleAccordion() }}>
                <S.AccordionView>
                    <S.AccordionWrapper>
                        <S.IconContent>
                            {
                                icon === 'phone' ? <MaterialIcons name="phone-in-talk" size={24} color={`${STYLE_GUIDE.Colors.primary}`} /> :
                                    icon === 'whatsapp' ? <FontAwesome5 name="whatsapp" size={24} color={STYLE_GUIDE.Colors.primary} /> :
                                        icon === 'email' ? <Fontisto name="email" size={24} color="black" /> :

                                            <MaterialCommunityIcons name="web" size={24} color={STYLE_GUIDE.Colors.primary} />
                            }
                        </S.IconContent>

                        <S.AccordionTitle>
                            {title}
                        </S.AccordionTitle>
                    </S.AccordionWrapper>
                    <SimpleLineIcons name={open ? "arrow-up" : "arrow-down"} size={24} color={STYLE_GUIDE.Colors.primary} />
                </S.AccordionView>
            </Pressable>
            <Animated.View style={{ height: heightAnimationInterpolation, overflow: 'hidden', justifyContent: 'center', }}>
                {open && (
                    <TouchableOpacity onPress={handleContentClick}>
                        <S.AccordionText>
                            •  {content}
                        </S.AccordionText>
                    </TouchableOpacity>
                )}
            </Animated.View>

        </S.AccordionContainer>
    )

}

export default AccordionElement
