import styled from 'styled-components/native'
import { STYLE_GUIDE } from '../../Styles/global'


export const ForgotPassContainer = styled.View`
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
`
export const ForgotPassTitle = styled.Text`

    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: -0.5px;

    color: #828282;
    margin-bottom: 18px;
    margin-top: 26px;

`
export const ForgotPassDescription = styled.Text`

    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead300};
    line-height: 20px;
    letter-spacing: -0.5px;
    color: ${STYLE_GUIDE.Colors.label};


`

export const ForgotPassForm = styled.View`
    gap: 11px;
    margin-top: 27px;
`
export const ForgotPassLabel = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    line-height: 19px;
    color: ${STYLE_GUIDE.Colors.primary};


`
export const ForgotPassInput = styled.TextInput`
    height: 40px;
    width: 100%;
    padding-left: 13px;
    box-sizing: border-box;

    background: transparent;
    border: 1px solid ${STYLE_GUIDE.Colors.borderColor};
    border-radius: 5px;

`

export const ForgotPassButton = styled.View`
    margin-top: 80px;
    width: 100%;
    height: 45px;
    background: ${STYLE_GUIDE.Colors.secundary};
    border-radius: 5px;

    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    /* Resetar Senha */

    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead300};
    line-height: 23px;

    color: ${STYLE_GUIDE.Colors.white};


`

export const ErrorMessage = styled.Text`
    position: absolute;
    bottom: -45px;
    color: ${STYLE_GUIDE.Colors.alert}
`