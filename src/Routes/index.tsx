import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack.routes';
import { UserContextProvider } from '../Context/User.context';

export default function Routes() {
    return (
        <UserContextProvider>
            <NavigationContainer>
                <StackRoutes />
            </NavigationContainer>
        </UserContextProvider>
    )
}


