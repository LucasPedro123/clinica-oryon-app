import styled from 'styled-components/native';
import { STYLE_GUIDE } from '../../../Styles/global';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  align-self: center;
  margin-top: 92px; 
  margin-bottom: 32px; 
`;

export const CardImage = styled.Image`
    width: 343px;
    height: 340px;
    border-radius: 35px;
   

`;

export const CardWrapper = styled.View`
    width: 343px;
    gap: 33px;
    align-items: center;
`;

export const CardTitle = styled.Text`
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 20px;
    color: #2D2D2D;
    align-self: flex-start;
`;

export const ImageWrapper = styled.View`
    position: relative;
    shadow-offset: 0px 21px;
    shadow-opacity: 0.26;
    shadow-radius: 30px;
    elevation: 9;
`
export const Line = styled.View`
    position: absolute;
    width: 50px;
    bottom: 16;
    align-self: center;
    border: 3px solid ${STYLE_GUIDE.Colors.white};
    border-radius: 100px;
`

export const CardDescription = styled.Text`
    font-family: 'Raleway';
    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
    color: ${STYLE_GUIDE.Colors.gray100};
    align-self: flex-start;
`;

export const Wrapper = styled.View`
    gap: 16px;
`

export const Description = styled.Text`
    font-family: 'Raleway';
    font-weight: ${STYLE_GUIDE.FontWeight.bold};
    font-size: 16px;
    color: #2D2D2D;
    align-self: flex-start;

`