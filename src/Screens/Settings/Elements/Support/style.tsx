import styled from 'styled-components/native'
import { STYLE_GUIDE } from '../../../../Styles/global'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    margin-top: 10%;
`


export const Title = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead100};
    line-height: 29px;
    color: ${STYLE_GUIDE.Colors.primary};
    margin-bottom: 116px;
`

export const Wrapper = styled.View`
    gap: 20px;
    
`
