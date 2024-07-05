import React, { useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import Home from '../Screens/Home';
import { Profile } from '../Screens/Profile';
import Search from '../Screens/Search';
import { ForgotPass } from '../Screens/ForgotPass';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, } from 'react-native';
import { View } from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabArry  = [
    { name: 'Home', component: Home, icon: 'home' },
    { name: 'Search', component: SearchStackRoute, icon: 'search' },
    { name: 'Profile', component: Profile, icon: 'user-circle' }
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
            viewRef.current.animate({0: {scale: 1, }, 1: {scale: 1.3, }})
         }
        else {
            viewRef.current.animate({0: {scale: 1.3, }, 1: {scale: 1, }})
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
    selected: {
    },
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
                        backgroundColor: '#090d53',
                        position: 'absolute',
                        marginBottom: 23,
                        right: 16,
                        left: 16,
                        height: 60,
                        alignSelf: 'center',
                        borderRadius: 20,
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
    return (
        <>
            <StatusBar style='dark' />
            <Stack.Navigator initialRouteName='signin'>
                <Stack.Screen name='signin' component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name='signup' component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name='forgotpass' component={ForgotPass} options={{ headerShown: true, headerTitle: '' }}/>
                <Stack.Screen name='MainTabs' component={MainTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </>
    );
}
