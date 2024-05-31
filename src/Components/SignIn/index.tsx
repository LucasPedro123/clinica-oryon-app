import { TouchableOpacity } from 'react-native';

// Style
import * as S from './style';
// Images
import logo from '../../../assets/logoClinicaOryon.png'

export default function SignIn({navigation}: any) {

    function handeleNavigateForSignUp() {
        navigation.navigate('signup')
    }

    return (
        <S.ContainerSignIn>
            <S.LogoContainer>
                <S.Logo source={logo}/>
            </S.LogoContainer>
            <S.Forms>
                <S.FormTextWrapper>
                    <S.SignInTitle>Olá, bem-vindo(a) de volta!</S.SignInTitle>
                    <S.SignInSubTitle>Complete o Login para continuar.</S.SignInSubTitle>
                </S.FormTextWrapper>
            </S.Forms>
        </S.ContainerSignIn>
    )
}
