import styled from 'styled-components/native'
import { STYLE_GUIDE } from '../../Styles/global'
import { Shadow } from 'react-native-shadow-2';
import { View } from 'react-native';

export const Container = styled.ScrollView`
    flex: 1;
    margin-top: 35px;
    margin-bottom: -20px;
    height: 100%;
`

export const Cards = styled.View`
    display: flex;
    flex-direction: row;
    gap: 22px;
    height: 100%;
    padding: 20px 0px;
`
export const Card = styled.View`
  display: flex;
  justify-content: space-between;
  width: 234px;
  height: 100%;
  background: #fff;
  border-radius: 16px;
  padding: 14px 14px;

  /* Shadow styles for iOS */
  shadow-offset: 3px 3px;
  shadow-opacity: 0.25;
  shadow-radius: 20px;

  /* Shadow styles for Android */
  elevation: 9;
`;

export const CardImage = styled.Image`
    width: 206px;
    height: 137px;
    border-radius: 10px;

`
export const CardWrapper = styled.View`

`
export const CardTitle = styled.Text`
    font-family: 'Raleway';
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: 800;
    font-size: ${STYLE_GUIDE.FontSize.subHead300};
    line-height: 25px;
    color: ${STYLE_GUIDE.Colors.title};
`
export const CardDescription = styled.Text`
    font-family: 'Raleway';
    font-weight: 400;
    color: ${STYLE_GUIDE.Colors.gray100};
    font-size: ${STYLE_GUIDE.FontSize.description};
    line-height: 14px;
    margin-bottom: 15px;
`;

export const CardButton = styled.TouchableOpacity`
    padding: 8px 32px;
    width: 169px;
    background: ${STYLE_GUIDE.Colors.secundary};
    border-radius: 48px;
    display: flex;
    align-items: center;
    align-self: center;
`
export const ButtonText = styled.Text`
    font-weight: 500;
    font-size: 16px;
    color: ${STYLE_GUIDE.Colors.white};
`