import styled from "styled-components/native";
import { STYLE_GUIDE } from "../../Styles/global";

export const FootContainer = styled.View`
    display: flex;
    border: 1px solid ${STYLE_GUIDE.Colors.borderColor};
    border-radius: 10px;
    margin: 35px 24px;
    padding: 10px 0px;
`
export const FootContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 0px 24px;
    margin-bottom: -30px;
    margin-top: 60px;
`
export const MyFootTitle = styled.Text`
    font-family: 'Raleway';
    font-weight: ${STYLE_GUIDE.FontWeight.bold};
    font-size: ${STYLE_GUIDE.FontSize.subHead200};
    line-height: 25px;
    color: ${STYLE_GUIDE.Colors.title};
`
export const TextTotalCalories = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    line-height: 19px;

    color: ${STYLE_GUIDE.Colors.highlight};
    

`

export const MyFootWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 5px;
`
export const MyFoot = styled.View`
    flex-direction: column;
    margin: 5px 0px;
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


export const MyFootView = styled.View`
    flex-direction: column;
`

export const FootName = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    line-height: 19px;
    color: ${STYLE_GUIDE.Colors.gray100};


`
export const FootCalories = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    line-height: 19px;

    color: ${STYLE_GUIDE.Colors.gray200};


`

export const NoFoodMessage = styled.Text`
    margin: 7px 0px;
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    line-height: 19px;
    color: ${STYLE_GUIDE.Colors.gray100};
    padding-left: 5px;

`

export const ButtonWrapper = styled.View`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: -21px;
`
export const ButtonText = styled.Text`

    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: #836BA9;
`
export const Button = styled.TouchableOpacity`
    width: 31px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Wrapper = styled.View`
    flex-direction: row;
    gap: 12px;
    
`