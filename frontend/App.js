// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import HomeGridScreen from './src/HomeGridScreen';
import CreateAppScreen from './src/CreateAppScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false,animation: 'fade'  }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HomeGrid" component={HomeGridScreen} />
        <Stack.Screen name="CreateApp" component={CreateAppScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}