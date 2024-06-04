import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';


const { Navigator, Screen } = createStackNavigator();

export default function StackRoutes() {
    return (
        <Navigator>
            <Screen name='signin' component={SignIn} options={{headerShown: false}}/>
            <Screen name='signup' component={SignUp} options={{headerShown: false}}/>
        </Navigator>
    )
}
