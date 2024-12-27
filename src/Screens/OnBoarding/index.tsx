import * as S from './style'
import Image1 from '../../../assets/danilo-image-flat-design.png'
import Image2 from '../../../assets/person-flat-design.png'
import Image3 from '../../../assets/persons-chart-flat-design.png'
import { Dimensions, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import { useRef, useState } from 'react'
import { STYLE_GUIDE } from '../../Styles/global'
import AntDesign from '@expo/vector-icons/AntDesign';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { StackParamList } from '../../Routes/types.route'

const { width, height } = Dimensions.get('window');

const slides = [
    {
        id: 1,
        title: 'Bem-vindo(a) ao app da Clínica ORYON',
        description: 'Sua jornada para uma vida mais saudável começa aqui! Com nosso aplicativo, você pode gerenciar suas calorias de forma eficiente e personalizada.',
        image: Image1,
    },
    {
        id: 2,
        title: 'Como funciona o App da Clínica ORYON?',
        description: 'Pesquise e escolha alimentos de nossa extensa base de dados, incluindo informações sobre calorias e porções. Adicione-os à sua lista diária de consumo e acompanhe facilmente suas calorias.',
        image: Image2,
    },
    {
        id: 3,
        title: 'Relatórios e Acompanhamento Personalizado',
        description: 'Mantenha-se no controle com nossos relatórios semanais. Veja a soma total de calorias consumidas, médias diárias e acompanhamento detalhado de cada dia da semana.',
        image: Image3,
    },
]

export const OnBoarding = ({navigation} : any) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const ref = useRef<any>();

    const HandleToScreenSignIn = () => {
        navigation.navigate('signin')
    }

    const Slide = ({ item }: any) => {
        return (
            <S.Wrapper >
                <Image
                    source={item.image}
                    style={{ width: '100%', resizeMode: 'cover' }}
                />
                <S.Content>
                    <S.Title style={{ width: width }}>{item.title}</S.Title>
                    <S.Description style={{ width: width }}>{item.description}</S.Description>
                </S.Content>
            </S.Wrapper>
        )
    }

    const Footer = () => {
        return (
            <S.BottomView style={{ width: width }}>
                <TouchableOpacity onPress={()=> skip()}>
                    <S.SkipText>
                        {
                            currentSlideIndex != 2 ? 'Skip' : ''
                        }
                    </S.SkipText>
                </TouchableOpacity>
                <S.DotsItem>
                    {
                        slides.map((_, index) => {
                            return (
                                <S.Dots
                                    key={index}
                                    style={[currentSlideIndex == index && {
                                        width: 25,
                                        backgroundColor: STYLE_GUIDE.Colors.secundary
                                    }]}
                                />
                            )
                        })
                    }
                </S.DotsItem>
                <TouchableOpacity onPress={()=> goNextSlide()}>
                    <AntDesign name="rightcircle" size={41} color={STYLE_GUIDE.Colors.secundary} />
                </TouchableOpacity>
            </S.BottomView>
        )
    }

    const updateCurrentSlideIndex = (e: any) => {
        const contentOffSetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffSetX / width) 
        setCurrentSlideIndex(currentIndex)
    }

    const goNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (currentSlideIndex < slides.length - 1) {
            const offset = nextSlideIndex * width;
            ref?.current?.scrollToOffset({ offset });
            setCurrentSlideIndex(nextSlideIndex);
        } else {
            HandleToScreenSignIn()
        }
    }

    const skip = () => {
        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * width;
        ref?.current?.scrollToOffset({ offset })
        console.log(lastSlideIndex)
        setCurrentSlideIndex(lastSlideIndex)
    }

    return (
        <S.Container>
            <S.CardItems>
                <FlatList
                    ref={ref}
                    data={slides}
                    horizontal
                    pagingEnabled
                    onMomentumScrollEnd={updateCurrentSlideIndex}
                    renderItem={({ item }) => <Slide item={item} />}
                    showsHorizontalScrollIndicator={false}
                />
            </S.CardItems>
            <Footer />
        </S.Container>
    )
}