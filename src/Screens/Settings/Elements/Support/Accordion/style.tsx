import styled from 'styled-components/native'
import { STYLE_GUIDE } from '../../../../../Styles/global'

export const AccordionView = styled.View`
    flex-direction: row;
    width: 310px;
    padding: 10px 0px;
    justify-content: space-between;
    align-items: center;

`
export const AccordionTitle = styled.Text`
    font-size: ${STYLE_GUIDE.FontSize.subHead300};
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: 16px;
    line-height: 19px;
    color: ${STYLE_GUIDE.Colors.primary};
`
export const AccordionText = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead300};
    line-height: 19px;
    color: ${STYLE_GUIDE.Colors.label};
    padding-left: 13px;
`
export const AccordionWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 26px;
`

export const AccordionContainer = styled.View`
`


export const IconContent = styled.View`
    border-radius: 100px;
    padding: 5px 5px;
    width: 40px;
    height: 40px;
    background-color: ${STYLE_GUIDE.Colors.white};

    align-items: center;
    justify-content: center;

    shadow-offset: 2px 3px;
    shadow-opacity: 0.25;
    shadow-radius: 20px;
    elevation: 3;
`