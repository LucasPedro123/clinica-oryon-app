import styled from 'styled-components/native'
import { STYLE_GUIDE } from '../../Styles/global'

export const Container = styled.View`
    flex: 1;
    margin-top: 30px;
`

export const Title = styled.Text`
    font-weight: 600;
    font-size: 13px;
    line-height: 15px;
    color: ${STYLE_GUIDE.Colors.gray100};
    align-self: center;
    margin-top: 30px;
`
export const Value = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 40px;
    line-height: 47px;
    color: #242425;
`