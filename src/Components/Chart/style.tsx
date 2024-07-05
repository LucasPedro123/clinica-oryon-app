import styled from "styled-components/native";
import { STYLE_GUIDE } from "../../Styles/global";

export const ChartContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 75px;
`;

export const ChartBorderView = styled.View`
    border: 1px solid ${STYLE_GUIDE.Colors.borderColor};
    border-radius: 10px;
`;
export const ChartView = styled.View`
    padding: 20px 20px;
`

export const ChartContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: #ECECEC;
    width: 100vw;

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
    background: #090d53;
    border-radius: 10px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

`

export const modalContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

export const modalContent = styled.View`
    width: 90%;
    padding: 29px;
    background-color: white;
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