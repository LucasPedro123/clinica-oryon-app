import styled from 'styled-components/native';
import { STYLE_GUIDE } from '../../../../Styles/global';

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
    align-items: center;
    gap: 33px;
    width: 360px;
`

export const NotificationCard = styled.TouchableOpacity`
    gap: 5px;
    background-color: ${STYLE_GUIDE.Colors.white};
    border-radius: 10px;
    padding: 15px;
    margin: 5px;
    width: 95%;
    shadow-offset: 2px 3px;
    shadow-opacity: 0.25;
    shadow-radius: 20px;
    elevation: 3;
`

export const NotificationData = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    line-height: 20px; 
    color: ${STYLE_GUIDE.Colors.secundary};
`

export const NotificationTitle = styled.Text`
    font-weight: 500;
    font-size: ${STYLE_GUIDE.FontSize.subHead200};
    color: ${STYLE_GUIDE.Colors.primary};
`

export const NotificationAuthor = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    line-height: 20px; 
    color: ${STYLE_GUIDE.Colors.primary};
`

export const NotificationContent = styled.Text`
    font-family: 'Raleway';
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    line-height: 20px; 
    color: ${STYLE_GUIDE.Colors.gray100};
`
