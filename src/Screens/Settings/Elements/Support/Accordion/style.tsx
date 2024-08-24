import styled from 'styled-components/native'
import { STYLE_GUIDE } from '../../../../../Styles/global'

export const AccordionView = styled.View`
    flex-direction: row;
    width: 310px;
    height: 60px;
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
    gap: 26px;
`

export const AccordionContainer = styled.View`
`