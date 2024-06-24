import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import Home from '../Screens/Home';
import { StatusBar } from 'expo-status-bar';
import { Profile } from '../Screens/Profile';
import Search from '../Screens/Search';
import { ForgotPass } from '../Screens/ForgotPass';


const { Navigator, Screen } = createStackNavigator();

export default function StackRoutes() {
    return (
        <>
            <StatusBar />
            <Navigator>
                <Screen name='signin' component={SignIn} options={{ headerShown: false }} />
                <Screen name='signup' component={SignUp} options={{ headerShown: false }} />
                <Screen name='home' component={Home} options={{ headerShown: false }} />
                <Screen name='profile' component={Profile} options={{ headerShown: false }} />
                <Screen name='search' component={Search} options={{ headerShown: false }} />
                <Screen name='forgotpass' component={ForgotPass} options={{ headerShown: true, headerTitle: '' }} />
            </Navigator>
        </>
    )
}
