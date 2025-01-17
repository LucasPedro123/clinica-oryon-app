import styled from "styled-components/native";
import { STYLE_GUIDE } from "../../Styles/global";

export const Container = styled.View`
    justify-content: space-around;
    flex: 1px;    
`

export const ChartContainer = styled.View`
    flex: 1;
`;

export const Wrapper = styled.View`
    justify-content: space-around;
    height: 100%;
`
export const Content = styled.View`
    align-items: center;
    gap: 10px;
`

export const NumberTitle = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: 40px;
    line-height: 47px;
    color: ${STYLE_GUIDE.Colors.primary};
`

export const ChartView = styled.View`
    width: 100%;
    max-width: 800px;
`

export const ChartContent = styled.View`
    flex-direction: row;
    border-bottom-width: 1px;

    padding: 20px 20px;
`;

export const ChartTitle = styled.Text`
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    line-height: 17px;
    color: ${STYLE_GUIDE.Colors.highlight};
`;

export const ChartName = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead200};
    line-height: 25px;
    color: ${STYLE_GUIDE.Colors.gray200};
    margin-bottom: 5px;
    align-self: flex-start;
    padding: 0px 20px;
`

export const SettingIcon = styled.Pressable`
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background: ${STYLE_GUIDE.Colors.primary};
    border-radius: 10px;
`

export const modalContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

export const modalContent = styled.View`
    width: 90%;
    padding: 29px;
    background-color: ${STYLE_GUIDE.Colors.white};
    border-radius: 30px;
    align-items: center;
`;

export const modalTitle = styled.Text`
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 23px;
`;

export const modalInput = styled.TextInput`
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
`;


export const modalButton = styled.TouchableOpacity`
    width: 100%;
    height: 51px;
    background-color: ${STYLE_GUIDE.Colors.secundary};
    border-radius: 100px;

    align-items: center;
    justify-content: center;
    margin-top: 37px;
`

export const modalWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 23px;
`

export const ChartItems = styled.View`
    width: 100%;
    padding: 0px 20px;

    display: flex;
    gap: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
export const ChartItem = styled.View`
    height: 67px;
    background: #F9F9F9;
    shadow-offset: 0.5px 0.5px;
    shadow-opacity: 0.02;
    shadow-radius: 15px;
    elevation: 3;
    border-radius: 12px;
    padding: 5px;
    align-items: center;
    justify-content: center;
    gap: 8px;
`

export const ItemTitle = styled.Text`
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: ${STYLE_GUIDE.Colors.gray200};
`
export const ItemValue = styled.Text`
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: ${STYLE_GUIDE.Colors.black};
`
export const NumberDiary = styled.Text`
    font-weight: 500;
    font-size: 40px;
    line-height: 47px;
    color: #242425;
`

export const Button = styled.View`
    align-items: center;
    height: 250px;margin-bottom: -30px;
`