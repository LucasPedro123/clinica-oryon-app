import AccordionElement from './Accordion'
import * as S from './style'

export const SupportCenter: React.FC = () => {

    return (
        <S.Container>
            <S.Title>
                Centro de Suporte
            </S.Title>
            <S.Wrapper>
                <AccordionElement icon='phone' title='Telefone' content='(11) 3073-0405'/>
                <AccordionElement icon='whatsapp'title='Whatsapp' content='(11) 99351-6440'/>
                <AccordionElement icon='email'title='Email' content='oryonestetica@clinicaoryon.com.br'/>
                <AccordionElement icon='web'title='Website' content='http://clinicaoryon.com.br'/>
            </S.Wrapper>

        </S.Container>
    )
}