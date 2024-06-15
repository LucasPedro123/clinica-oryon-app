import { styled } from 'styled-components/native'
import { STYLE_GUIDE } from '../../Styles/global'



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
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead100};
    line-height: 34px;
    color: ${STYLE_GUIDE.Colors.black};
`
export const SignInSubTitle = styled.Text`

    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: 14px;
    line-height: 19px;

    color: ${STYLE_GUIDE.Colors.label};

`

export const FormsContent = styled.View`
    width: 100%;
    align-items: center;
    margin-top: 41px;
    gap: 12px;
    text-align: end;
`
export const InputWrapper = styled.View`
    gap: 7px;
    color: ${STYLE_GUIDE.Colors.gray200};
`
export const InputName = styled.Text`
    width: 100%;
    align-items: start;
`

export const Input = styled.TextInput`
    background: transparent;
    border: 1px solid ${STYLE_GUIDE.Colors.borderColor};
    border-radius: 5px;
    width: 360px;
    height: 40px;
    padding: 0px 13px;
`
export const InputPassword = styled.TextInput`
    height: 100%;
    width: 90%;
`
export const PasswordView = styled.View`
    background: transparent;
    border: 1px solid ${STYLE_GUIDE.Colors.borderColor};
    border-radius: 5px;
    width: 360px;
    height: 40px;
    padding: 0px 13px;

    flex-direction: row;
    align-items: center;
`
export const ForgotPassView = styled.View`
    width: 360px;
    flex-direction: row;
    justify-content: space-between;
`
export const ForgotPassText = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    color: ${STYLE_GUIDE.Colors.alert};


`

export const CheckBoxView = styled.View`
    flex-direction: row;
    gap: 7px;
`
export const CheckBox = styled.TouchableOpacity`
    background: transparent;
    border: 1px solid ${STYLE_GUIDE.Colors.borderColor};
    border-radius: 5px;
    width: 20px;
    height: 20px;
    
    align-items: center;
    justify-content: center;
`

export const CheckBoxText = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};

`

export const FormsButtonView = styled.View`
    width: 100%;
    gap: 27px;
    align-items: center;
    margin-top: 127px;
`
export const FormsButton = styled.TouchableOpacity`
    width: 360px;
    height: 45px;
    border-radius: 5px;
    background: ${STYLE_GUIDE.Colors.secundary};

    align-items: center;
    justify-content: center;



`
export const ButtonText = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead200};
    color: ${STYLE_GUIDE.Colors.white};
    line-height: 23px;

`
export const DividerView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const Divider = styled.View`
    width: 135px;
    height: 0.5px;
    background-color: ${STYLE_GUIDE.Colors.black};
`


export const DividerText = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
`

export const GoogleAuthView = styled.View`

    background: transparent;
    border: 1px solid ${STYLE_GUIDE.Colors.borderColor};
    border-radius: 5px;
    width: 173px;
    height: 45px;

    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 22px;
`

export const GoogleAuthLogo = styled.Image`
    width: 23px;
    height: 23px;
`   
export const GoogleAuthText = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead300};
    line-height: 19px;

    color: #242A31;


` 

export const SignUpView = styled.View`
    flex-direction: row;
    gap: 9px;
`
export const SignUpText = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    color: ${STYLE_GUIDE.Colors.label};


`
export const SignUpLink = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    color: ${STYLE_GUIDE.Colors.highlight};


`
