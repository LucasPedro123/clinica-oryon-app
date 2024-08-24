import styled from 'styled-components/native'
import { STYLE_GUIDE } from '../../../../Styles/global'

export const Container = styled.View`
    flex: 1;

    align-items: center;
    margin-top: 144px;
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
export const ProfileLabel = styled.Text`

    font-size: ${STYLE_GUIDE.FontSize.subHead400};
    color: ${STYLE_GUIDE.Colors.white};
`
export const ProfileLabelView = styled.View`
    position: absolute;
    bottom: 0px;
    align-self: center;
    width: 100%;
    background-color: #836ba996;
    padding-bottom: 9px;
    padding-top: 3px;
    align-items: center;
`

export const ProfileName = styled.Text`
    font-weight: 500;
    font-size: 22px;
    line-height: 28px;
    color: ${STYLE_GUIDE.Colors.primary};
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



export const ProfileImage = styled.Image`
    width: 150px;
    height: 144px;
    border-radius: 100px;
    border: 1px solid ${STYLE_GUIDE.Colors.primary};
`

export const ProfileContent = styled.TouchableOpacity`
    width: 150px;
    height: 144px;
    overflow: hidden;
    border-radius: 100px;
`

export const ProfileView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
`

export const ProfileWrapper = styled.View`
    gap: 17px;
`
export const ProfileInfoView = styled.View`
margin-top: 16px;
    width: 310px;
    background: ${STYLE_GUIDE.Colors.white};
    border-radius: 10px;
    elevation: 4;
    shadow-color: rgba(0, 0, 0, 0.25); 
    shadow-offset: 0px 4px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
`;
export const ProfileInfoValue = styled.Text`
    font-size: 16px;
    line-height: 19px;
    color: ${STYLE_GUIDE.Colors.primary};
    text-align: center;
    padding: 14px 0px;
`

export const SettingsCards = styled.View`
margin-top: 24px;
    gap: 30px;
`
export const SettingsCard = styled.View`
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

    shadow-color: rgba(39, 34, 70, 0.1);
    shadow-offset: 0 4px;
    shadow-opacity: 0.1;
    shadow-radius: 12px;
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
