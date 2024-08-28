import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack.routes';
import { UserContextProvider } from '../Context/User.context';
import { Provider as PaperProvider } from 'react-native-paper';
import { FoodProvider } from '../Context/Foods.context';
import { NotificationProvider } from '../Context/Notifications.context';
import * as Notifications from 'expo-notifications'


export default function Routes() {


    return (
        <PaperProvider>
            <FoodProvider>
                <NotificationProvider>
                    <UserContextProvider>
                        <NavigationContainer >
                            <StackRoutes />
                        </NavigationContainer>
                    </UserContextProvider>
                </NotificationProvider>
            </FoodProvider>
        </PaperProvider>
    )
}


