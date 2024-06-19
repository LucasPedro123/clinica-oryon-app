import styled from 'styled-components/native'
import { STYLE_GUIDE } from '../../Styles/global'

export const ProfileContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const ProfilePhoto = styled.View`
    width: 150px;
    height: 144px;
    background: ${STYLE_GUIDE.Colors.grayLight};
    border-radius: 100px;

    justify-content: center;
    align-items: center;
    margin-bottom: 24px;

`

export const ProfileName = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: 40px;
    line-height: 40px;

    color: ${STYLE_GUIDE.Colors.black};
    margin-bottom: 83px;

`

export const UserInfoView = styled.View`
    flex-direction: column;
    gap: 10px;
`
export const UserInfoText = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: 20px;
    line-height: 40px;

    color: ${STYLE_GUIDE.Colors.black};


`

export const ProfileExit = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: 20px;
    line-height: 40px;

    color: ${STYLE_GUIDE.Colors.alert};

    margin-top: 105px;
`