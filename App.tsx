import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './src/Routes';
import * as Font from 'expo-font';

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Raleway': require('./assets/Font/Raleway-Italic-VariableFont_wght.ttf'),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  
  
  return (
    <GestureHandlerRootView>
      <Routes />
    </GestureHandlerRootView>
  );
}
