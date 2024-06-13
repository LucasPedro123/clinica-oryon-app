import styled from "styled-components/native";
import { STYLE_GUIDE } from "../../Styles/global";

export const FootContainer = styled.View`
    flex: 1;
    width:100%;
    height: 100%;
    border: 1px solid ${STYLE_GUIDE.Colors.borderColor};
    border-radius: 10px;
    margin: 35px 2px;
`
export const FootContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 9px 9px;
`
export const MyFootTitle = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead200};
    line-height: 25px;
    color: ${STYLE_GUIDE.Colors.gray200};
`
export const TextCalories = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    line-height: 19px;

    color: ${STYLE_GUIDE.Colors.highlight};
    

`

export const MyFootWrapper = styled.View`

`
export const MyFootButton = styled.View`
    align-self: center;

    flex-direction: row;
    gap: 8px;
    width: 112px;
    height: 40px;
    background-color: ${STYLE_GUIDE.Colors.secundary};
    border-radius: 100px;

    justify-content: center;
    align-items: center;
`
export const ButtonText = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    line-height: 20px;
    letter-spacing: 0.1px;
    color: ${STYLE_GUIDE.Colors.white};

`