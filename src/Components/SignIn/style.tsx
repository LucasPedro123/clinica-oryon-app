import { styled } from 'styled-components/native'
import  {STYLE_GUIDE} from '../../Styles/global'



export const ContainerSignIn = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const LogoContainer = styled.View`
`
export const Logo = styled.Image`
    width: 228px;
    height: 80px;
`
export const Forms = styled.View`

`

export const FormTextWrapper = styled.View`
    margin-top: 41px;
`

export const SignInTitle = styled.Text`
    font-weight: 600;
    font-size: 25px;
    line-height: 34px;
    color: ${STYLE_GUIDE.Colors.black};
`
export const SignInSubTitle = styled.Text`

    font-weight: 600;
    font-size: 14px;
    line-height: 19px;

    color: #999EA1;


`