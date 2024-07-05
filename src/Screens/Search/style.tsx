import styled from "styled-components/native";
import { STYLE_GUIDE } from "../../Styles/global";

export const SearchContainer = styled.View`
    margin-top: 90px;
    flex: 1;
    align-items: center;
`
export const ImageLogo = styled.Image`
    width: 228px;
    height: 80px;
`
export const FormContainer = styled.View`
    margin-top: 37px;
`
export const FormInput = styled.TextInput`
    width: 90%;
    height: 100%;
`

export const FormInputContent = styled.View`
    height: 48px;
    width: 374px;
    padding-left: 22px;

    flex-direction: row;
    align-items: center;
    gap: 16px;

    box-sizing: border-box;
    background: transparent;
    border: 1px solid #CDD1E0;
    border-radius: 27px;


`

export const FootItems = styled.View`
    gap: 22px;
    margin: 26px 0px;
`

export const FootItem = styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding: 13px 22px;
    gap: 30px;

    width: 383px;
    height: 68px;
    background-color: ${STYLE_GUIDE.Colors.white};
    border-radius: 12px;
    elevation: 5;
    shadow-color: rgba(0, 0, 0, 0.25);
    shadow-offset: 0px 4px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;

`

export const FootNameWrapper = styled.View`
    
`

export const FootTitle = styled.Text`

    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead300};
    line-height: 22px;
    color: ${STYLE_GUIDE.Colors.black};


`
export const FootSubTitle = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: 12px;
    line-height: 16px;
    color: ${STYLE_GUIDE.Colors.gray200};
`

export const FootCalories = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead300};
    line-height: 22px;
    color: ${STYLE_GUIDE.Colors.black};
`
export const ButtonAdd = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 36px;
`

export const ModalView = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    background-color: #f0f0f0;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
`;

export const ModalWrapper = styled.View`
    padding-top: 50px;
    align-items: center;
`;

export const ModalTitle = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead200};
    color: ${STYLE_GUIDE.Colors.black};
    margin-bottom: 10px;
`;

export const ModalPortion = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: ${STYLE_GUIDE.FontSize.subHead300};
    color: ${STYLE_GUIDE.Colors.black};
    margin-bottom: 5px;
`;

export const ModalCalories = styled.Text`
    color: ${STYLE_GUIDE.Colors.secundary};
    font-weight: ${STYLE_GUIDE.FontWeight.semiBold};
    font-size: ${STYLE_GUIDE.FontSize.subHead300};
    margin-bottom: 20px;
`;

export const ModalContent = styled.View`
    flex: 1;
    width: 100%;
    padding: 0px 04px;
    padding-top: 20px;
`;

export const ModalText = styled.Text`
    font-weight: ${STYLE_GUIDE.FontWeight.regular};
    font-size: ${STYLE_GUIDE.FontSize.subHead300};
    color: ${STYLE_GUIDE.Colors.black};
    margin-bottom: 10px;
`;