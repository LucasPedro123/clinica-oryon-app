import styled from "styled-components/native";
import { STYLE_GUIDE } from "../../Styles/global";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
`

export const Wrapper = styled.View`
`

export const CardItems = styled.View`
    align-items: center;
`

export const Content = styled.View`
    margin-top: 62px;
    align-items: center;
    gap: 27px;
`

export const Title = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.bold};
    font-size: ${STYLE_GUIDE.FontSize.subHead100};
    text-align: center;
    color: ${STYLE_GUIDE.Colors.black};
`
export const Description = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.bold};
    font-size: ${STYLE_GUIDE.FontSize.subHead300};
    text-align: center;
    color: ${STYLE_GUIDE.Colors.gray200};
`

export const BottomView = styled.View`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 21px;
    margin-top: 10%;
`

export const DotsItem = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const SkipText = styled.Text`
    width: 30px;
`

export const Dots = styled.View`
    height: 10px;
    width: 10px;
    background-color: ${STYLE_GUIDE.Colors.grayLight};
    margin: 0 3px;
    border-radius: 50px;
`