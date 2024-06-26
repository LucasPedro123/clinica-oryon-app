import styled from "styled-components/native";
import { STYLE_GUIDE } from "../../Styles/global";

export const ChartContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 95px;
`;

export const ChartBorderView = styled.View`
    border: 2px solid ${STYLE_GUIDE.Colors.borderColor};
    border-radius: 10px;
`;
export const ChartView = styled.View`
    padding: 20px 20px;
`

export const ChartContent = styled.View`
    flex-direction: row;
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
