import styled from 'styled-components/native'
import { STYLE_GUIDE } from '../../../../Styles/global'


export const Container = styled.View`
    flex: 1;
    align-items: center;
    margin-top: 10%;
`


export const Title = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead100};
    line-height: 29px;
    color: ${STYLE_GUIDE.Colors.primary};
    margin-bottom: 52px;
`

export const InputWrapper = styled.View`
    margin-top: 11px;
    gap: 7px;
    color: ${STYLE_GUIDE.Colors.borderColor};

`
export const InputName = styled.Text`
    width: 100%;
    align-items: start;
    color: ${STYLE_GUIDE.Colors.primary};
`
export const ForgotPassBtn = styled.TouchableOpacity`
    align-items: flex-end;
`

export const TextForgotPass = styled.Text`
    font-weight: 600;
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    line-height: 19px;
    color: ${STYLE_GUIDE.Colors.alert};
`

export const Input = styled.TextInput`
    background: transparent;
    border: 1px solid ${STYLE_GUIDE.Colors.borderColor};
    border-radius: 5px;
    width: 360px;
    height: 40px;
    padding: 0px 13px;
`

export const Wrapper = styled.View`
    gap: 27px;
    margin-top: 72px;
`
export const FormsButton = styled.TouchableOpacity`
    width: 360px;
    height: 45px;
    border-radius: 5px;
    background: ${STYLE_GUIDE.Colors.secundary};

    align-items: center;
    justify-content: center;



`
export const FormsButtonSpinner = styled.View`
    width: 360px;
    height: 45px;
    border-radius: 5px;
    background: #C2A3D4;

    align-items: center;
    justify-content: center;



`
export const ButtonText = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead200};
    color: ${STYLE_GUIDE.Colors.white};
    line-height: 23px;

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

export const MessageText = styled.Text`
    position: absolute;
    align-self: center;
    top: 220px;
    font-size: ${STYLE_GUIDE.FontSize.subHead200};
    color:  ${STYLE_GUIDE.Colors.alert};
    
`