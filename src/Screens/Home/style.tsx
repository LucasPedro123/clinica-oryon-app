import styled from "styled-components/native";
import { STYLE_GUIDE } from "../../Styles/global";



export const HomeContainer = styled.View`
    flex: 1;
    margin-bottom: 70px;
`
export const Wrapper = styled.View`
    z-index: 99;
    background-color: #f0f0f0;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    margin-top: -20px;
`

export const ProfileWrapper = styled.View`
    flex-direction: column;
    gap: 10px;
`
export const ProfileContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 61px 24px 0px ;

`
export const ProfileText = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    line-height: 19px;
    letter-spacing: -0.28px;
    color: #FFFFFF;
`
export const ProfileName = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.bold};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    line-height: 19px;
    letter-spacing: -0.28px;
    color: ${STYLE_GUIDE.Colors.white};
`

export const UserPhoto = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background-color: ${STYLE_GUIDE.Colors.white};

    align-items: center;
    justify-content: center;

`

export const ProfileImage = styled.Image`
    width: 100%;
    height: 100%;
`