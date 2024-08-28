import { Text, View } from 'react-native'
import Chart from '../../Components/Chart'
import * as S from './style'

export const Dashboard: React.FC = () => {
    return (
        <S.Container>
            <S.Title>
                Gráfico
            </S.Title>
            <Chart />
        </S.Container>
    )
}