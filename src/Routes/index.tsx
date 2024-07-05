import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack.routes';
import { UserContextProvider } from '../Context/User.context';
import { Provider as PaperProvider } from 'react-native-paper';

export default function Routes() {
    return (
        <UserContextProvider>
            <PaperProvider>
                <NavigationContainer >
                    <StackRoutes />
                </NavigationContainer>
            </PaperProvider>
        </UserContextProvider>
    )
}


