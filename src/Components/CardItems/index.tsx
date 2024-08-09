import * as S from './style';
import CardImage1 from '../../../assets/a-clinica.jpg';
import CardImage2 from '../../../assets/massage-image.jpg';
import CardImage3 from '../../../assets/people-clinic.jpg';
import CardImage4 from '../../../assets/dr_danilo.jpg';
import CardImage5 from '../../../assets/Toxina-botulínica.jpg';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from '../../Routes/types.route';

export const Card: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const navigateToDetails = (image: string, title: string, description: string, paragraph: string) => {
    navigation.navigate('CardDetails', { image, title, description, paragraph });
  };
  const navigateToAbout = (image: string, title: string, description: string, paragraph: string) => {
    navigation.navigate('CardAbout', { image, title, description, paragraph });
  };

  return (
    <S.Container horizontal={true} showsHorizontalScrollIndicator={false}>
      <S.Cards>
        <S.Card>
          <S.CardWrapper>
            <S.CardImage source={CardImage1} />
            <S.CardTitle>Conheça a Clínica Oryon</S.CardTitle>
            <S.CardDescription>Profissionais experientes em endocrinologia, estética e dermatologia, em um ambiente acolhedor.</S.CardDescription>
          </S.CardWrapper>
          <S.CardButton onPress={() => navigateToAbout(CardImage1, 'Conheça a Clínica Oryon', 'Profissionais experientes em endocrinologia, estética e dermatologia, em um ambiente acolhedor.', 'A Clínica Oryon oferece tratamentos estéticos de alta performance e conta com uma equipe de especialistas dedicados a proporcionar o melhor atendimento.')}>
            <S.ButtonText>Saber Mais</S.ButtonText>
          </S.CardButton>
        </S.Card>
        
        <S.Card>
          <S.CardWrapper>
            <S.CardImage source={CardImage2} />
            <S.CardTitle>Massagem Modeladora</S.CardTitle>
            <S.CardDescription>A técnica combina movimentos rápidos e intensos para combater a celulite.</S.CardDescription>
          </S.CardWrapper>
          <S.CardButton onPress={() => navigateToDetails(CardImage2, 'Massagem Modeladora', 'A técnica combina movimentos rápidos e intensos para combater a celulite.', 'Os movimentos rápidos e intensos com a utilização de cremes específicos ajudam a melhorar a circulação e a reduzir a celulite, proporcionando uma pele mais firme e lisa.')}>
            <S.ButtonText>Saber Mais</S.ButtonText>
          </S.CardButton>
        </S.Card>
        
        <S.Card >
          <S.CardWrapper>
            <S.CardImage source={CardImage3} />
            <S.CardTitle>Peelings</S.CardTitle>
            <S.CardDescription>Os peelings de diamante e de cristal renovam a pele e estimulam a produção de colágeno.</S.CardDescription>
          </S.CardWrapper>
          <S.CardButton onPress={() => navigateToDetails(CardImage3, 'Peelings', 'Os peelings de diamante e de cristal renovam a pele e estimulam a produção de colágeno.', 'Os peelings de diamante e de cristal são procedimentos estéticos que provocam esfoliação superficial, renovando as camadas mais superficiais da pele e melhorando a textura, viço e brilho.')}>
            <S.ButtonText>Saber Mais</S.ButtonText>
          </S.CardButton>
        </S.Card>
        
        <S.Card>
          <S.CardWrapper>
            <S.CardImage source={CardImage4} />
            <S.CardTitle>Conheça o Dr. Danilo</S.CardTitle>
            <S.CardDescription>Especialista em endocrinologia e estética, com ampla experiência e reconhecimento internacional.</S.CardDescription>
          </S.CardWrapper>
          <S.CardButton onPress={() => navigateToDetails(CardImage4, 'Conheça o Dr. Danilo Bianchini Höfling', 'Especialista em endocrinologia e estética, com ampla experiência e reconhecimento internacional.', 'Dr. Danilo Bianchini Höfling possui Doutorado e Pós-Doutorado em Ciências pela USP, com publicações em revistas internacionais de prestígio. Atua em endocrinologia e realiza diversos procedimentos estéticos.')}>
            <S.ButtonText>Saber Mais</S.ButtonText>
          </S.CardButton>
        </S.Card>

        <S.Card>
          <S.CardWrapper>
            <S.CardImage source={CardImage5} />
            <S.CardTitle>Toxina Botulínica</S.CardTitle>
            <S.CardDescription>Reduza rugas e linhas de expressão com aplicação de toxina botulínica.</S.CardDescription>
          </S.CardWrapper>
          <S.CardButton onPress={() => navigateToDetails(CardImage5, 'Toxina Botulínica', 'Reduza rugas e linhas de expressão com aplicação de toxina botulínica.', 'A aplicação de toxina botulínica ajuda a suavizar rugas e linhas de expressão, proporcionando um aspecto mais jovem e revitalizado à pele.')}>
            <S.ButtonText>Saber Mais</S.ButtonText>
          </S.CardButton>
        </S.Card>
      </S.Cards>
    </S.Container>
  );
};
