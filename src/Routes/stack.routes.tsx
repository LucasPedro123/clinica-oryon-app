import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import Home from '../Components/Home';
import { StatusBar } from 'expo-status-bar';


const { Navigator, Screen } = createStackNavigator();

export default function StackRoutes() {
    return (
        <>
            <StatusBar/>
            <Navigator>
                <Screen name='signin' component={SignIn} options={{ headerShown: false }} />
                <Screen name='signup' component={SignUp} options={{ headerShown: false }} />
                <Screen name='home' component={Home} options={{ headerShown: false }} />
            </Navigator>
        </>
    )
}
