import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './src/Routes';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Raleway': require('./assets/Font/Raleway-VariableFont_wght.ttf'),
      });
    };

    loadFont();
  }, []);



  return (
    <GestureHandlerRootView>
      <Routes />
    </GestureHandlerRootView>
  );
}
