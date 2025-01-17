import React, { useContext, useEffect, useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import Home from '../Screens/Home';
import { Settings } from '../Screens/Settings';
import Search from '../Screens/Search';
import { ForgotPass } from '../Screens/ForgotPass';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../Services/fireConfig';
import { UserContext, UserContextProvider } from '../Context/User.context';
import { STYLE_GUIDE } from '../Styles/global';
import { FoodProvider } from '../Context/Foods.context';
import { AuthState } from '../Interfaces/app.interfaces';
import { CardDetails } from '../Components/CardItems/CardDetails';
import { Dashboard } from '../Screens/Dashboard';
import { CardAbout } from '../Components/CardItems/CardAbout';
import { ProfileUser } from '../Screens/Settings/Elements/ProfileUser';
import { SupportCenter } from '../Screens/Settings/Elements/Support';
import { Notifications } from '../Screens/Settings/Elements/Notification';
import { NotificationDetails } from '../Screens/Settings/Elements/Notification/NotificationDetails';
import { ConfigLoginScreen } from '../Screens/Settings/Elements/ConfigLogin';
import { OnBoarding } from '../Screens/OnBoarding';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabArry = [
    { name: 'Home', component: Home, icon: 'home' },
    { name: 'Search', component: SearchStackRoute, icon: 'search' },
    { name: 'Chart', component: Dashboard, icon: 'bar-chart-2' },
    { name: 'Settings', component: Settings, icon: 'settings' },
];



function SearchStackRoute({ navigation }: any) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    headerShown: true,
                    headerLeft: () => (
                        <Feather
                            name="arrow-left"
                            size={24}
                            color="#090c4e"
                            style={{ marginLeft: 16 }}
                            onPress={() => navigation.navigate('Home')} // Navegar de volta para a tela Home no TabNavigator
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
}

const TabButton = ({ accessibilityState, iconName, onPress }: any) => {
    const selected = accessibilityState.selected;
    const color = selected ? 'white' : '#9E9E9E';
    const viewRef = useRef<any>(null);

    useEffect(() => {
        if (selected) {
            viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 1.3 } })
        }
        else {
            viewRef.current.animate({ 0: { scale: 1.3 }, 1: { scale: 1 } })
        }
    }, [selected])

    return (
        <TouchableOpacity
            style={[styles.container, selected ? styles.selected : null]}
            onPress={onPress}
        >
            <View ref={viewRef} style={styles.iconContainer} animation={'zoomIn'} duration={1000} delay={300}>
                {iconName == 'user-circle' ? <FontAwesome name={iconName} size={23} color={color} /> : iconName == 'home' ? <Entypo name={iconName} size={24} color={color} /> : <Feather name={iconName} size={23} color={color} />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selected: {},
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

function MainTabs() {
    return (
        <>
            <StatusBar style='light' />
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({ route }) => ({
                    tabBarStyle: {
                        display: route.name === 'Search' ? 'none' : 'flex',
                        backgroundColor: STYLE_GUIDE.Colors.primary,
                        position: 'absolute',
                        marginBottom: 23,
                        right: 16,
                        left: 16,
                        height: 60,
                        alignSelf: 'center',
                        borderRadius: 100,
                        elevation: 5,
                    },
                    tabBarShowLabel: false,
                })}
            >
                {TabArry.map((tab) => (
                    <Tab.Screen
                        key={tab.name}
                        name={tab.name}
                        component={tab.component}
                        options={{
                            headerShown: false,
                            tabBarButton: (props) => <TabButton {...props} iconName={tab.icon} />
                        }}
                    />
                ))}
            </Tab.Navigator>
        </>
    );
}

export default function MainRoutes() {
    const context = useContext(UserContext);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<boolean | null>(null)

    useEffect( () => {
        const checkFirstLaunch = async () => {
            try {
                const appData = await AsyncStorage.getItem('isAppFirstLaunched');
                
                if (appData == null) {
                    setIsAppFirstLaunched(true);
                    await AsyncStorage.setItem('isAppFirstLaunched', 'false');
                } else {
                    setIsAppFirstLaunched(false);
                }
            } catch (error) {
                console.error('Erro ao acessar AsyncStorage:', error);
            }
        };
    
        checkFirstLaunch();
    }, [])

    useEffect(() => {
        const checkPersistedAuth = async () => {
            try {
                const authState = await AsyncStorage.getItem('persistedAuth');

                if (authState) {
                    const jsonValue: AuthState = JSON.parse(authState);
                    signInWithEmailAndPassword(auth, jsonValue.email, jsonValue.pass)
                        .then((userCredential) => {
                            const userId = userCredential.user.uid;
                            context?.setUserId(userId);
                            setIsLogged(true);
                        })
                        .catch(error => {
                            console.error('Erro ao autenticar:', error);
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Erro ao recuperar o estado de autenticação persistente:', error);
                setIsLoading(false);
            }
        };

        checkPersistedAuth();
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <>
            <StatusBar style='dark' />
            <Stack.Navigator initialRouteName={isLogged ? 'MainTabs' : 'onboarding'}>
                {
                    isAppFirstLaunched ? 
                        
                    <Stack.Screen
                    name='onboarding'
                    component={OnBoarding}
                    options={{ headerShown: false }}
                /> : null
                }
                <Stack.Screen name='signin' component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name='signup' component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name='forgotpass' component={ForgotPass} options={{ headerShown: true, headerTitle: '', headerTransparent: true }} />
                <Stack.Screen name='MainTabs' component={MainTabs} options={{ headerShown: false }} />
                <Stack.Screen name='CardDetails' component={CardDetails} options={{ headerShown: true, headerTitle: '', headerTransparent: true }} />
                <Stack.Screen name='CardAbout' component={CardAbout} options={{ headerShown: true, headerTitle: '', headerTransparent: true }} />

                <Stack.Screen name='ProfileUser' component={ProfileUser} options={{ headerShown: true, headerTitle: '', headerTransparent: true }} />
                <Stack.Screen name='SupportCenter' component={SupportCenter} options={{ headerShown: true, headerTitle: '', headerTransparent: true }} />

                <Stack.Screen name='Notifications' component={Notifications} options={{ headerShown: true, headerTitle: '', headerTransparent: true }} />
                <Stack.Screen name='NotificationDetails' component={NotificationDetails} options={{ headerShown: true, headerTitle: '', headerTransparent: true }} />

                <Stack.Screen name='ConfigLogin' component={ConfigLoginScreen} options={{ headerShown: true, headerTitle: '', headerTransparent: true }} />
            </Stack.Navigator>
        </>
    );
}
