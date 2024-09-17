import styled from 'styled-components/native'
import { STYLE_GUIDE } from '../../Styles/global'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    gap: 58px;
    margin-top: 131px;
`

export const SettingsTitle = styled.Text`
    font-family: 'Raleway';
    font-weight: ${STYLE_GUIDE.FontWeight.bold};
    font-size: ${STYLE_GUIDE.FontSize.subHead100};
    line-height: 28px;
    color: ${STYLE_GUIDE.Colors.title};
`

export const SettingsCards = styled.View`
    gap: 30px;
`
export const SettingsCard = styled.View`
    width: 100%;
    padding: 0px 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const CardWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 26px;
`
export const CardName = styled.Text`
    font-family: 'Raleway';
    font-weight: 600;
    font-size: 18px;
    line-height: 30px;
    color: ${STYLE_GUIDE.Colors.primary};
`

export const IconContent = styled.View`
    width: 44px;
    height: 44px;
    border-radius: 100px;
    background-color: ${STYLE_GUIDE.Colors.white};

    align-items: center;
    justify-content: center;

    shadow-offset: 2px 3px;
    shadow-opacity: 0.25;
    shadow-radius: 20px;
    elevation: 3;
`

export const Wrapper = styled.View`
    gap: 22px;
    align-items: center;
    margin-top: 94px;
`
export const Text = styled.Text`
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: ${STYLE_GUIDE.Colors.primary};
`
export const CircleNotifications = styled.View`
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: ${STYLE_GUIDE.Colors.alert};
    right: 0;
    top: 0;
    border-radius: 100px;
    z-index: 2;
`