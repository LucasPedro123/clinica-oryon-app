import styled from 'styled-components/native';
import { STYLE_GUIDE } from '../../../../../Styles/global';

export const Container = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    margin-top: 10%;
`


export const Title = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead100};
    line-height: 29px;
    color: ${STYLE_GUIDE.Colors.primary};
    margin-bottom: 36px;
`
export const Wrapper = styled.View`
    gap: 16px;
`
export const ContentLinks = styled.View`
    flex-direction: row;
    gap: 27px;
`

export const NotificationTitle = styled.Text`
    width: 320px;
    font-family: 'Raleway';
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: 32px;
    line-height: 44px;
    color: #171923;
`

export const NotificationsDate = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: ${STYLE_GUIDE.FontSize.subHead300};
    line-height: 20px;
    color: #171923;
    opacity: 0.8;
`

export const NotificationDetailsContent = styled.View`
    gap: 32px;
    margin-bottom: 30px;
`


export const NotificationText = styled.Text`
    width: 320px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #171923;
    opacity: 0.5;
`